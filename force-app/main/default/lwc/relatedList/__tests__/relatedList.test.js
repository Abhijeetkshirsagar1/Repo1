
import { createElement } from 'lwc'
import RelatedList from 'c/relatedList'
import { wireadapter } from '@salesforce/sfdx-lwc-jest'
import getRelatedContacts from '@salesforce/apex/RelatedContactsController.getRelatedContacts'

// Register an Apex wire adapter
const getRelatedContactsAdapter = wireadapter(getRelatedContacts)

describe('c-related-list', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild)
    }
    // Clear mock calls between tests
    jest.clearAllMocks()
  })

  it('displays related contacts when an account Id is provided', () => {
    const mockContacts = [
      {
        Id: '0015i00000V9RmaAAF',
        Name: 'John Doe',
        Email: 'johndoe@example.com',
        Phone: '(123) 456-7890'
      },
      {
        Id: '0015i00AAAV9RmaAAF',
        Name: 'Jane Smith',
        Email: 'janesmith@example.com',
        Phone: '(555) 555-5555'
      }
    ]
    // Create element
    const element = createElement('c-related-list', {
      is: RelatedList
    })
    // Set public properties
    element.recordId = '0015i00000V9RmaAAF'
    element.accountId = '0015i00000V9RmaAAF'
    document.body.appendChild(element)

    // Emit data from @wire
    getRelatedContactsAdapter.emit(mockContacts)

    // Select elements for validation
    const contactNames = Array.from(element.shadowRoot.querySelectorAll('td[data-label="Contact Name"]')).map(td => td.textContent)
    const emails = Array.from(element.shadowRoot.querySelectorAll('td[data-label="Email"]')).map(td => td.textContent)
    const phones = Array.from(element.shadowRoot.querySelectorAll('td[data-label="Phone"]')).map(td => td.textContent)

    // Verify displayed data
    expect(contactNames).toEqual(['John Doe', 'Jane Smith'])
    expect(emails).toEqual(['johndoe@example.com', 'janesmith@example.com'])
    expect(phones).toEqual(['(123) 456-7890', '(555) 555-5555'])
  })

  it('displays error message when there is an error retrieving related contacts', () => {
    // Create element
    const element = createElement('c-related-list', {
      is: RelatedList
    })
    // Set public properties
    element.recordId = '0015i00000V9RmaAAF'
    element.accountId = '0015i00000V9RmaAAF'
    document.body.appendChild(element)

    // Emit error from @wire
    getRelatedContactsAdapter.error()

    // Select elements for validation
    const errorElement = element.shadowRoot.querySelector('p')

    // Verify error message is displayed
    expect(errorElement.textContent).toBe('Error retrieving related contacts.')
  })
})

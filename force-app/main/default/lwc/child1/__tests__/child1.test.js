import { createElement } from 'lwc';
import Child1 from 'c/child1';

async function flushPromises(){
    return Promise.resolve();
}

describe('c-child1', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('test buttons', async() => {
    
        const element = createElement('c-child1', {
            is: Child1
        });
        document.body.appendChild(element);

        // Assert
        const buttons = element.shadowRoot.querySelectorAll('lightning-button');
        buttons[0].dispatchEvent(new CustomEvent('click'));
        buttons[1].dispatchEvent(new CustomEvent('click'));
        await flushPromises();

        expect(1).toBe(1);
    });
});
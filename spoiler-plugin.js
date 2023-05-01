document.addEventListener('DOMContentLoaded', function() {
    function wrapSpoilerText(element) {
      const span = document.createElement('span');
      span.className = 'spoiler-text hidden';
      span.textContent = element;
      return span;
    }
  
    function createSpoilerElement() {
      const spoilerElement = document.createElement('span');
      spoilerElement.className = 'spoiler-element';
      return spoilerElement;
    }
  
    function getTextNodes(node) {
      const textNodes = [];
      for (const child of node.childNodes) {
        if (child.nodeType === Node.TEXT_NODE) {
          textNodes.push(child);
        } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName.toLowerCase() !== 'script') {
          textNodes.push(...getTextNodes(child));
        }
      }
      return textNodes;
    }
  
    const spoilerRegex = /\|\|([\s\S]*?)\|\|/g;
  
    getTextNodes(document.body).forEach(function(textNode) {
      const textContent = textNode.textContent;
      let newTextContent = '';
      let lastIndex = 0;
  
      textContent.replace(spoilerRegex, function(match, p1, offset) {
        newTextContent += textContent.slice(lastIndex, offset);
  
        const spoilerElement = createSpoilerElement();
        spoilerElement.appendChild(wrapSpoilerText(p1));
        newTextContent += spoilerElement.outerHTML;
  
        lastIndex = offset + match.length;
      });
  
      newTextContent += textContent.slice(lastIndex);
  
      if (textContent !== newTextContent) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = newTextContent;
        textNode.replaceWith(...Array.from(wrapper.childNodes));
      }
    });
  
    document.body.addEventListener('click', function(e) {
      const spoilerText = e.target.closest('.spoiler-element .spoiler-text');
      if (spoilerText) {
        spoilerText.classList.remove('hidden');
      }
    });
  
  });
  
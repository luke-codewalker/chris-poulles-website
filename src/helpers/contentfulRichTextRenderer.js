import Handlebars from "handlebars";

const nodeMap = {
    "document": {
        openingTag: () => '<div>',
        closingTag: () => '</div>',
    },
    "paragraph": {
        openingTag: () => '<p>',
        closingTag: () => '</p>',
    },
    "hyperlink": {
        openingTag: (node) => `<a class="link" href="${node.data.uri}" target="_blank" rel="noopener noreferrer">`,
        closingTag: () => '</a>',
    },
    "text": {
        openingTag: (node) =>  node.marks &&  node.marks.length > 0 && node.marks[0].type === 'bold' ? '<em>' : '',
        closingTag: (node) =>  node.marks &&  node.marks.length > 0 && node.marks[0].type === 'bold' ? '</em>' : '',
    },
}

const render = (data, htmlString) => {
    htmlString += nodeMap[data.nodeType].openingTag(data);
    if (data.content && data.content.length > 0) {
        data.content.forEach(node => {
            htmlString = render(node, htmlString)
        })
    } else if (data.value) {
        htmlString += data.value;
    }
    htmlString += nodeMap[data.nodeType].closingTag(data);

    return htmlString;
}

export default richTextData => new Handlebars.SafeString(render(richTextData, ''))

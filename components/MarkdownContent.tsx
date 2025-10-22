import React from 'react';

const processLine = (line: string) => {
    // Process **bold** text
    return line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
};

export const MarkdownContent: React.FC<{ content: string }> = ({ content }) => {
    const lines = content.split('\n');
    // Fix: Use React.ReactElement instead of JSX.Element to resolve namespace issue.
    const elements: React.ReactElement[] = [];
    let listItems: string[] = [];

    const flushListItems = () => {
        if (listItems.length > 0) {
            elements.push(
                <ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-1 my-2 pl-2">
                    {listItems.map((item, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                </ul>
            );
            listItems = [];
        }
    };

    lines.forEach((line, index) => {
        if (line.match(/^\s*[-*]\s+/)) {
            // It's a list item
            const itemContent = line.replace(/^\s*[-*]\s+/, '');
            listItems.push(processLine(itemContent));
        } else {
            // Not a list item, so any current list is finished
            flushListItems();
            // If the line is not empty, add it as a paragraph
            if (line.trim().length > 0) {
                elements.push(
                    <p key={index} className="my-2" dangerouslySetInnerHTML={{ __html: processLine(line) }} />
                );
            }
        }
    });

    // After the loop, flush any remaining list items
    flushListItems();

    return <>{elements}</>;
};

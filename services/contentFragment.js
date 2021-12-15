import React from 'react'


export const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = ( <span className='flex justify-center text-base italic p-10 border-l-2 border-blue-400 leading-8 text-justify mt-2 mb-10'> <em key={index}>{text}</em> </span>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }

      if(obj.listItem){
        modifiedText = (<u key={index}>{text}</u>);
      }
    }

    switch (type) {
        case 'heading-one': 
            return <h1 key={index} className='text-gray-700 font-semibold text-xl mb-10'>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h1>;
        case 'heading-two': 
            return <h2 key={index} className='text-gray-700 font-semibold text-lg mt-10 mb-0'>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h2>;
        case 'heading-three':
            return <h3 key={index} className="text-gray-700 font-semibold text-lg mt-10 mb-0">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
        case 'paragraph':
         return <p key={index} className="text-sm text-gray-600 leading-9 text-justify first-of-type:mt-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
        case 'heading-four':
            return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
        case 'numbered-list':
            return  <ol className='list-disc px-4' key={index}>{obj.children.map((el) => el.children.map((el) => el.children.map((el, i) =>( <li key={i}>{el.text}</li>  ))))}</ol>;
          case 'image':
            return (
              <img className='flex justify-center w-full'
                key={index}
                alt={obj.title}
                height={obj.height}
                width={obj.width}
                src={obj.src}
              />
            );
          default:
            return modifiedText;
        }
    };

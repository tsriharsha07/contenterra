import { useState, useEffect } from "react";
import "./App.css";

import { decode } from "html-entities";
import DOMPurify from "dompurify";

function App() {
  const [data, setData] = useState(0);
  useEffect(() => {
    fetch("https://www.reddit.com/r/reactjs.json")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);
  console.log(data);
  const decodeHtmlEntities = (html) => {
    return decode(html);
  };
  return (
    <div>
      <div>
        {data &&
          data.data &&
          data.data.children.map((item, index) => {
            const htmlContent = item.data.selftext_html;
            const sanitizedHtmlContent = DOMPurify.sanitize(htmlContent);
            const decodedHtml = decodeHtmlEntities(sanitizedHtmlContent);
            return (
              <div key={index} className="mainClass p-4 w-100 lg:w-50 mx-auto">
                <div className="card body1">
                  <div className="card-header">{item.data.title}</div>
                  <div className="card-body">
                    <div
                      className="card-text"
                      dangerouslySetInnerHTML={{ __html: decodedHtml }}
                    />
                    <h5 className="card-title">{item.data.score}</h5>
                    <a href={item.data.url} className="btn btn-primary">
                      Go to the given link
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;

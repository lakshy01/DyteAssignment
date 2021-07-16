import React, { useState, useEffect } from 'react';

import Editor from './components/Editor';
import useLocalStorage from './hooks/useLocalStorage';

import './App.css';

const App = () => {

    const [html, setHtml] = useLocalStorage('html', '');
    const [css, setCss] = useLocalStorage('css', '');
    const [js, setJs] = useLocalStorage('js', '');
    const [srcDoc, setSrcDoc] = useState('');

    const [ishtml, setIshtml] = useState(true);
    const [iscss, setIscss] = useState(false);
    const [isjs, setIsjs] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
          setSrcDoc(`
            <html>
              <body>${html}</body>
              <style>${css}</style>
              <script>${js}</script>
            </html>
          `)
        }, 250)
    
        return () => clearTimeout(timeout)
      }, [html, css, js]);

      const changeToHtml = () => {
          setIshtml(true);
          setIscss(false);
          setIsjs(false);
      };

      
      const changeToCss = () => {
        setIshtml(false);
        setIscss(true);
        setIsjs(false);
      };

      
      const changeToJs = () => {
        setIshtml(false);
        setIscss(false);
        setIsjs(true);
      };


    return(
        <div className="container">
            <div className="app">
                <div className="header">
                    <div className="search-bar">
                        <input type="text" placeholder="Search" />
                    </div>
                </div>
                <div className="wrapper">
                    <div className="left-side">
                        <div className="side-wrapper">
                            <div className="side-title">Files</div>
                            <div className="side-menu">
                                <a href="#" onClick={changeToHtml}> index.html </a>
                                <a href="#" onClick={changeToCss}> index.css </a>
                                <a href="#" onClick={changeToJs}> index.js </a>
                            </div>
                        </div>
                    </div>
                    <div className="main-container">
                        <div className="content-wrapper">
                            <div className="content-wrapper-header">
                                <div className="content-wrapper-context">
                                    {ishtml===true && 
                                        <Editor 
                                            language="xml"
                                            displayName="HTML"
                                            value={html}
                                            onChange={setHtml}
                                    />
                                    }
                                    {iscss===true && 
                                        <Editor 
                                            language="css"
                                            displayName="CSS"
                                            value={css}
                                            onChange={setCss}
                                        />
                                    }
                                    {isjs===true && 
                                        <Editor 
                                            language="javascript"
                                            displayName="JS"
                                            value={js}
                                            onChange={setJs}
                                        />
                                    }
                                </div>
                            </div>  
                            <br />  
                            <div className="content-wrapper-header">
                                <div className="content-wrapper-context">
                                    <iframe
                                        srcDoc={srcDoc}
                                        title="output"
                                        sandbox="allow-scripts"
                                        frameBorder="0"
                                        width='800px'
                                        height="100%"
                                     style={{backgroundColor: 'white', borderBottomLeftRadius: '0.5rem', borderBottomRightRadius: '0.5rem'}}/>
                                </div>
                            </div>
                        </div> 
                        <div class="overlay-app"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
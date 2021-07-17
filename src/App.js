import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Editor from './components/Editor';
import useLocalStorage from './hooks/useLocalStorage';

import './App.css';

// "proxy": ["https://pastebin.com/login","http://localhost:3000","https://pastebin.com/api/api_login.php"],

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

    const saveCode = () => {

        const headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        };

        axios.post("https://pastebin.com/login",{
            api_dev_key: "7zjSMqN8lqi2JPQ6k7EBW4bCwuvMCOU-",
            api_user_name: "lakshy01",
            api_user_password: "Welcome@1234" 
        },{headers})
        .then((data)=>{
            console.log(data);
        })
        .catch((err)=>{
            console.log("Not done");
        })
    }


    return(
        <div className="container">
            <div className="app">
                <div className="header">
                    <div className="search-bar">
                        <button class="save-btn" onClick={saveCode}>Save Code</button>
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
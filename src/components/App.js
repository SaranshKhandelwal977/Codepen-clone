import React, {useState, useEffect} from "react";
import Editor from "./Editor";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Header } from "./Header";

function App() {
  const [html,setHtml] = useLocalStorage('html', '');
  const [css,setCss] = useLocalStorage('css', '');
  const [js,setJs] = useLocalStorage('js', '');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(
        ` 
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
        `
      )
    },250)
    return () => clearTimeout(timeout);
  },[html,css,js])

  return (
    <>
      <Header></Header>
      <div className="pane top-pane">
        <Editor language='xml' displayName='HTML' 
        value={html}
        onChange={setHtml}></Editor>
        <Editor language='css' displayName='CSS'
         value={css}
        onChange={setCss}></Editor>
        <Editor language='javascript' displayName='JS'
         value={js}
        onChange={setJs}></Editor>
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          className="frame"
          title="output"
          sandbox="allow-scripts"
          width="100%"
          height="100%"

        />
      </div>
    </>
  );
}

export default App;

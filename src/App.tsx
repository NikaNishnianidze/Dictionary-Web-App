import Header from "./components/Header";
import Main from "./components/Main";
import { useState } from "react";

export type TFontType = "sans" | "serif" | "mono";

function App() {
  const [font, setFont] = useState<TFontType>("sans");

  return (
    <>
      <Header font={font} setFont={setFont} />
      <Main font={font} />
    </>
  );
}

export default App;

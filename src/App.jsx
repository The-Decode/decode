import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <WalletProvider onError={onError} adapters={adapters}>
      <WalletModalProvider>
        {/* Place your app's components here */}
        <main className="dm-sans dark bg-black to-background text-foreground">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
            </Routes>
          </BrowserRouter>
        </main>
      </WalletModalProvider>
    </WalletProvider>
  );
}

export default App;

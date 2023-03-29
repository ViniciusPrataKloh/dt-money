import { ThemeProvider } from "styled-components";
import { TransactionsContextProvider } from "./contexts/TransactionsContext";
import { Home } from "./pages/Home";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TransactionsContextProvider>
        <GlobalStyle />

        <Home />
      </TransactionsContextProvider>
    </ThemeProvider>
  )
}

import "./App.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { AppRouter } from "./shared/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";

function App() {
  return (
    <MantineProvider withCssVariables withGlobalClasses withStaticClasses>
      <Layout>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Layout>
    </MantineProvider>
  );
}

export default App;

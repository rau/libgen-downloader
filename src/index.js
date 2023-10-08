// React
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
// Images
// Delilah Components
import App from "./App"
// Feature Components
// External Components
// Delilah Functions
// Libraries
import { Toaster } from "react-hot-toast"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<Router>
		<App />
		<Toaster />
	</Router>
)

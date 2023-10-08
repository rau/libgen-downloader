// React
// Images
// Delilah Components
// Feature Components
// External Components
// Delilah Functions
// Libraries
import { useEffect, useState } from "react"
import { Route, Routes } from "react-router"
import "./App.css"
import Home from "./components/Home"

const App = () => {
	return (
		<Routes>
			<Route path='/*' element={<Home />} />
		</Routes>
	)
}

export default App

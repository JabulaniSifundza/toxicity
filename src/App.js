import React, { useRef, useState, useEffect } from "react";
//import logo from './logo.svg';
import './App.css';
import * as tf from "@tensorflow/tfjs";
import * as toxicity from '@tensorflow-models/toxicity';


function App() {
	const inputRef = useRef();
	const [model, setModel] = useState(null);


	const runToxic = async () =>{
		const threshold = 0.7;
		const detector = await toxicity.load(threshold);
		setModel(detector);
		console.log("Model has ben loaded");
	}

	useEffect(()=>{
		runToxic();
	}, [])

	const toxicityDetection = async() =>{
		if(model !== null){
			
			const sentences = [inputRef.current.value];
			console.log(sentences);
			model.classify(sentences).then(predictions =>{
				console.log(predictions);
			})
		}
	}

  return (
    <div className="App">
	<input type="text" ref={inputRef} />
	<button onClick={()=> toxicityDetection}>Detect</button>
  
    </div>
  );
}

export default App;

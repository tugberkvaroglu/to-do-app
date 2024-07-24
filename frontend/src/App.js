import React, {useState, useEffect} from 'react'

function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/api/users/4").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])
  return (
    <div>
      {(typeof data.users === "undefined") ? (
        <p>loading...</p>
      ) : (
        
          <p> data.users </p>
        )
      }
    </div>
  )
}

export default App

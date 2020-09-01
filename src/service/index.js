export const fetchAllColors = () => {
    fetch("https://reqres.in/api/unknown")
        .then(res =>{
          console.log(res.json())
          return res.json()
        })
}

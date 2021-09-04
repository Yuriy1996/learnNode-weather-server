console.log('Client is loading')

// fetch('https://puzzle.mead.io/puzzle')
//   .then(res => {
//     return res.json()
//   })
//   .then(data => {
//     console.log('data', data)
//   })
//   .catch(err => {
//     console.error(err?.response?.message)
//   })

fetch('http://localhost:3001/weather?address=Boston')
  .then(res => {
    return res.json()
  })
  .then(data => {
    console.log('data', data)
  })
  .catch(err => {
    console.log(err?.message)
  })

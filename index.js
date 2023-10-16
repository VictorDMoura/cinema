const main = document.querySelector('main')
const form = document.querySelector('form')
const button = document.querySelector('button')

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
const seats = []
let reserved = []

function createPlaces(){
  for(let i = 0; i < 10; i++){
    const row = []
    for(let j = 1; j < 16; j++){
      const div = document.createElement('div')
      div.classList.add('bloco')
      const newDiv = document.createElement('div')
      newDiv.classList.add('lugar')
      const p = document.createElement('p')
      div.classList.add(letters[i] + j)
      p.innerText = letters[i] + j
      // adicionar os elementos  
      div.appendChild(newDiv)
      div.appendChild(p)
      main.appendChild(div)
      row.push(false)
    }
    seats.push(row)
  }
}

button.addEventListener('click', function(){
  const seat = form.poltrona.value.toUpperCase()

  if (seat.length == 0){
    alert('Campo vazio!')
    return
  }
  const row = letters.indexOf(seat.charAt(0))
  if(row === -1){
    alert(`${seat}: É um lugar inválido`)
    form.poltrona.value=""
    return
  }
  const column = Number(seat.substring(1))
  if(column > 15 || column < 0){
    alert(`${seat}: É um lugar inválido`)
    form.poltrona.value=""
    return
  }

  if(seats[row][column-1]){
    alert(`${seat}: Lugar ja está ocupado`)
  } else {
    const revservar = '.'+ seat
    const place = document.querySelector(revservar)
    place.firstChild.classList.remove('lugar')
    place.firstChild.classList.add('reservado')
    reserved.push([row, column-1])
  }

  form.poltrona.value="" 
})


form.addEventListener('submit', (e) => {
  e.preventDefault()
  if(reserved.length == 0){
    alert("Nenhum lugar foi reservado")
  }

  
  for(let element of reserved){
    [row, column] = element
    seats[row][column] = true
    const className = letters[row] + (column + 1)
    const place = document.querySelector('.'+ className)
    place.firstChild.classList.remove('reservado')
    place.firstChild.classList.add('ocupado')
  }
  reserved = []
})




window.addEventListener('load',createPlaces)
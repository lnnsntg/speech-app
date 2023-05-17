import { useRef, useState } from 'react'
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography
} from '@mui/material'

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

function App () {
  recognition.continuous = true
  recognition.lang = 'en-US'
  recognition.interimResult = true

  function onSpeech () {
    recognition.start()
    console.log('Speech recognition has started.')
  }
  function onStop () {
    recognition.stop()
    setText(prevText => prevText + ' ')
    inputRef.current.focus()
    console.log('Speech recognition has stopped.')
  }
  // Asocia el evento onresult
  recognition.onresult = function (event) {
    // Obtiene el resultado provisional más reciente
    const result = event.results[event.resultIndex]
    console.log(event.results)
    // Obtiene el texto provisional
    const transcript = result[0].transcript
    // Actualiza el cuadro de texto sin borrar lo anterior
    setText(prevText => prevText + transcript)
    inputRef.current.focus()
  }

  const [text, setText] = useState('')

  const handleChanged = event => {
    setText(event.target.value)
  }
  const inputRef = useRef(null)

  // Función para cambiar entre encender y apagar
  const [isOn, setIsOn] = useState(false)
  function toggleFunction () {
    if (!isOn) {
      onSpeech()
      setIsOn(true)
    } else {
      onStop()
      setIsOn(false)
    }
  }

  return (
    <>
      <CssBaseline>
        <Container maxWidth='sm'>
          <Typography variant='h4' align='center'>
            Speech to text
          </Typography>
          <Box>
            <TextField
              id='input-text'
              placeholder='MultiLine with rows: 10'
              multiline
              rows={10}
              fullWidth={true}
              onChange={handleChanged}
              value={text}
              inputRef={inputRef}
            ></TextField>
          </Box>
          <Box display='flex' justifyContent='space-between' pt={2}>
            <Button
              variant='contained'
              color={isOn ? 'error' : 'success'}
              onClick={toggleFunction}
            >
              {isOn ? 'PARAR' : 'INICIAR'}
            </Button>
            <Button variant='contained' color='error'>
              {'to do'}
            </Button>
          </Box>
        </Container>
      </CssBaseline>
    </>
  )
}

export default App

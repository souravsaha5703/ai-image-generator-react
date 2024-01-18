import { useState } from 'react'
import Loader from './Components/Loader'
import axios from 'axios';

function App() {
  const [textPrompt, setTextPrompt] = useState('');
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState([]);

  const options = {
    method: 'POST',
    url: 'https://chatgpt-42.p.rapidapi.com/texttoimage',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'b95a4219c8msh9b913764c776818p1b95d1jsn6b530f0e9e2a',
      'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
    },
    data: { text: textPrompt }
  };

  async function imagesData() {
    setLoading(true);
    const response = await axios.request(options);
    console.log(response.data);
    setImage([response.data.generated_image]);
    setLoading(false)
  }

  const handlePrompt = () => {
    imagesData();
  }

  return (
    <>
      <div className='w-full h-screen p-6 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-300 to-white'>
        <h1 className='text-center text-indigo-600 text-4xl font-bold mt-4 underline font-serif max-[560px]:text-xl max-[560px]:mt-1'>Generate Images from Texts</h1>
        <input type="text" placeholder='Enter a text prompt' required value={textPrompt} onChange={(e) => setTextPrompt(e.target.value)} className='w-96 h-12 mt-6 rounded-lg px-3 py-1 outline-none border-2 border-white text-indigo-500 font-medium text-md focus:border-indigo-600 ease-linear max-[560px]:w-4/5' />
        <button onClick={handlePrompt} className='bg-indigo-500 px-3 py-3 mt-5 rounded-lg text-white text-xl ease-in-out duration-100 hover:bg-indigo-800 max-[560px]:text-sm'>Generate Images</button>
        {
          loading ? (
            <Loader />
          ) : (
            <div className='flex items-center justify-center'>
              {
                image && image.map((img,index)=>{
                  return(
                    <img src={img}
                      key={index}
                      className='mt-10 w-96 object-cover max-[560px]:w-4/5' />
                  )
              })
            }
            </div>
          )}
      </div>
    </>
  )
}

export default App

import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import nl2br from 'react-nl2br'

export default function Home() {
   const [input, setInput] = useState({
      price: 500,
      feeling: 'なんでもいい',
   })
   const [result, setResult] = useState('')
   const [loading, setLoading] = useState(false)

   const handleChange = (e) => {
      setInput({ ...input, [e.target.name]: e.target.value })
   }

   const getResult = async (text) => {
      const res = await fetch('/api/gpt', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ text: text }),
      })
      const data = await res.json()
      console.log(data)
      setResult(data.content)
      setLoading(false)
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      const text = `秋葉原で${input.price}円以下でテイクアウトできる飲食店を教えてください。${input.feeling}気分です。`
      console.log(text)
      getResult(text)
      setLoading(true)
   }

   return (
      <>
         <Head>
            <title>お昼ごはん決めて偉い-ChatGPTを添えて-</title>
            <meta name='description' content=' お昼ごはん決めて偉い' />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <link rel='icon' href='/favicon.ico' />
         </Head>
         <main className={styles.container}>
            {result ? (
               <div className={styles.formWrapper}>
                  <p>{nl2br(result)}</p>
                  <button onClick={() => setResult('')}>Back</button>
               </div>
            ) : (
               <form onSubmit={handleSubmit} className={styles.formWrapper}>
                  <h1>お昼ごはん決めて偉い</h1>
                  <p>今日の予算は？</p>
                  <select name='price' onChange={handleChange}>
                     <option value='500'>500円</option>
                     <option value='750'>750円</option>
                     <option value='1000'>1000円</option>
                     <option value='1200'>1200円</option>
                     <option value='1500'>1500円</option>
                  </select>
                  <p>今日の気分は？</p>
                  <select name='feeling' onChange={handleChange} defaultValue={'和食'}>
                     <option>なんでもいい</option>
                     <option>眠い</option>
                     <option>疲れている</option>
                     <option>もやもやしている</option>
                     <option>気合を入れたい</option>
                     <option>とてもお腹が空いている</option>
                     <option>すぐに食べたい</option>
                     <option>のんびりしたい</option>
                     <option>幸せな</option>
                     <option>贅沢したい</option>
                  </select>
                  <button type='submit' disabled={loading}>教えて！</button>
                  {loading && <p>お待ちください...</p>}
               </form>
            )}
         </main>
      </>
   )
}

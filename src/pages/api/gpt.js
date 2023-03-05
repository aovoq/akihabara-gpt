const { Configuration, OpenAIApi } = require('openai')

const handler = async (req, res) => {
   console.log(req.body.text)
   const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
   })
   const openai = new OpenAIApi(configuration)

   const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo-0301',
      messages: [{ role: 'user', content: req.body.text }],
   })
   // console.log(completion.data.choices[0].message)
   console.log(completion.data.choices[0].message.content)

   const resText = completion.data.choices[0].message.content
   // getGpt()
   res.status(200).json({ content: resText })
}

export default handler

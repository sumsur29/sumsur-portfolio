export interface Poem {
  id: string
  title: string
  language: 'hindi' | 'english'
  text: string
  image?: string
  date?: string
  context?: string
}

export const poems: Poem[] = [
  {
    id: 'subah-shaam-raat',
    title: 'सुबह, शाम, रात',
    language: 'hindi',
    image: '/poems/4c11da81-6cb5-40f7-a805-55401d0a134d_rw_1200.jpg',
    date: '2024',
    text: `सुबह से जब मैं मिला,
वो बोली,
"धुप ये मुझको सताए
काश मैं भी शाम होती,
सुनहरे आकाश में
एक अलग ही बात होती"

शाम से जब मैं मिला,
वो बोली,
"डूबता है सूरज मुझपे,
काश मैं भी रात होती,
चाँद के आँचल में,
एक अलग ही बात होती"

रात से जब मैं मिला,
वो बोली,
"डर लगता है अँधेरे में
काश मैं भी सुबह होती,
सूरज के उजास में,
एक अलग ही बात होती"

भोर को देखा मज़े में,
पूछा मेने राज़ क्या,
वो बोला..
"दुसरो की ख्वाहिशों में
खुद को बस झुलस दिया
दो ही पल की ज़िन्दगी में
रात को सुबह कर दिया`
  },
  {
    id: 'two-little-lambs',
    title: 'Two Little Lambs',
    language: 'english',
    image: '/poems/a8e8453f-db60-4038-8ed1-a498b7a0deee_rw_1200.jpg',
    date: '2024',
    text: `There once were two little lambs..
One was shy and other was beauty..
They both liked each other, as the shy would think..
At her he stared, but the beauty despaired..
He wanted to chat but was scared as hell..
To the beauty might never believe his tale..

He waited and waited but couldn't share..
Until one day when he went and dared..
But three words were all he could manage..
The beauty was shocked but the shy corrected..
To become friends is all he wanted..
His hands started sweating and body shivered..
To his surprise the beauty laughed
She smiled back and shook his hands..
His shyness was what got him saved..

The shy was happy and was on top of the world..
As he was no longer a part of the herd..
But slowly their friendship began to fade..
Until one day Shy broke his leg..
The beauty got worried and went to check..
The shy was down but he smiled back..
And then began the tale of friendship..
For the shy now knew that the beauty liked him..

The shy lamb, as he was, passed the message..
That blue wool she would wear if she likes him..
That night and for four more the shy couldn't sleep..
Cause the beauty would need to think deep..

And so the day finally arrived..
When the jacket blue the beauty tried..
The shy just smiled and wanted to dance..
But his leg still weak he could only trance..

The two little lambs beauty and shy..
Now together in a bond hard to come by..
10 years later and their friendship strong..
To each other these two lamb belong
Holding hands and looking at the sky..
The two little lambs beauty and shy..`
  },
  {
    id: 'if-i-could-draw',
    title: 'If I Could Draw',
    language: 'english',
    image: '/poems/b0805591-b05e-4035-b22f-acac85a1372d_rw_1200.jpg',
    date: '2024',
    text: `If i could draw i would draw her like this
Her eyelids with a hint of red
Her eyebrows of the perfect shape
Her beauty only a fool could miss
If i could draw i would draw her like this

Her hands straight with a palm pink
Her legs bend with a lots of cream
sleeping in a pure bliss
If i could draw i would draw her like this

Her hair flowing like a black wind
Her body glowing like a firefly
Her lips like got a god's kiss
If i could draw i would draw her like this

Her long neck like a white swan
Her skin o so soft
A sleeping beauty indeed she is
If i could draw i would draw her like this`
  },
  {
    id: 'my-mornings-without-you',
    title: 'My Mornings Without You',
    language: 'english',
    image: '/poems/bda102cf-7f18-4479-83a4-4cfd192e2e45_rw_1200.jpg',
    date: '2024',
    text: `To see your pretty face
That smile on your lips
The calmness and peace
I miss them all in
My Mornings without you

To touch your hands
That red glossy eyes
The wind in your hair
I miss them all in
My Mornings without you

To hold you by your waist
That feel of soft skin
The way you sleep on my arms
I miss them all in
My Mornings without you.`
  },
  {
    id: 'a-time-has-gone',
    title: 'A Time Has Gone, And A Time Will Come',
    language: 'english',
    image: '/poems/c8c6c3b6-b5b2-4468-8c24-4d9299d46695_rw_1200.jpg',
    date: '2024',
    text: `A TIME HAS GONE, AND A TIME WILL COME.
THE TORNADOS IN YOUR MINDS WILL SOON BE CALM.

STAND TALL AND LIFT YOUR HEADS.
THE MOMENT IS NOW TO SHOW COURAGE.
FOR A TIME HAS GONE AND A TIME WILL COME.

DO NOT GIVE UP, DO NOT LOOK DOWN.
THE TIME IS NOT TO BE AFRAID AND LOOSE.
FIGHT. FIGHT TILL YOU WIN.
FOR A TIME HAS GONE AND A TIME WILL COME.

DO NOT SHY AWAY FROM THE DARK ROAD.
THE PATH IS UNCLEAR BUT NOT UNKNOWN.
SHINE. SHINE TILL YOU SEE THE END.
FOR A TIME HAS GONE AND A TIME WILL COME.

DO NOT BE SHAKEN BY THE TOUGH GROUND.
THE TIME IS NOT TO LIE DOWN.
RISE. RISE AND STAND TALL.
FOR A TIME HAS GONE AND A TIME WILL COME.
THE TORNADOS IN YOUR MIND WILL SOON BE CALM.

FOR A TIME HAS GONE AND A TIME WILL COME.`
  },
  {
    id: 'diye-hai-pankh',
    title: 'दिए हैं पंख बाज़ के',
    language: 'hindi',
    image: '/poems/cf355876-2137-4b21-9d05-844abbeb3f64_rw_1200.jpg',
    date: '2024',
    text: `दिए हैं पंख बाज़ के
और कर दिया काँच के घर में बंद,
सब दिखता तो है पर छूने जाऊँ तो टकरा जाता हूँ
हर रोज़ खिड़की या दरवाज़े की तलाश करता हूँ,
पर काँच की दीवार से टकरा कर गिर जाता हूँ

टकराता हूँ, गिरता हूँ, घायल भी होता हूँ
पर रुकता नहीं हूँ
खुले आसमान में उड़ने की इच्छा रखता हूँ
और उड़ के रहूँगा ही एक दिन

एक दिन तो मिलेगी कोई खुली खिड़की
निकलूँगा वहीं से और उड़ जाऊँगा
छू लूँगा सब कुछ जो देखा था,
छीन लूँगा जो कुछ जो सोचा था,
छोड़ दूँगा हमेशा के लिए ये काँच का घर

बस तब तक हार नहीं मानूँगा
अपनी चोट को चाट चाट कर मरहम लगाऊँगा
रोऊँगा, मगर रुकूँगा नहीं
थकूँगा, मगर थमूँगा नहीं
एक दिन तो उड़ ही जाऊँगा

बाज़ हूँ, तीस हज़ार फ़ीट पर ही उड़ूँगा
फिर नीचे नहीं आऊँगा
चाहे जितना रोक लो अभी
दिए हैं पंख बाज़ के
तो बाज़ बन के उड़ता ही जाऊँगा`
  },
  {
    id: 'udhne-do-mujhe',
    title: 'उड़ने दो मुझे',
    language: 'hindi',
    image: '/poems/d680a48a-1ff8-4dfa-bdfa-2c9eca898118_rw_1200 (1).jpg',
    date: '2024',
    text: `उड़ने दो मुझे
ये क़लम मेरे पंख हैं और काग़ज़ मेरा आसमान
यूँ दुनिया के नियमों से चलने में क्या ही हासिल होगा?

बहने दो मुझे
ये क़लम मेरी नाव है और काग़ज़ मेरा समुद्र
यूँ मर्यादाओं के किनारों पर बैठ कर क्या ही हासिल होगा?

नाचने दो मुझे
ये क़लम मेरी धुन है और काग़ज़ मेरा मंच
यूँ बेताल दुनिया में थिरकने से क्या ही हासिल होगा?

रंगने दो मुझे
ये क़लम मेरे रंग हैं और काग़ज़ मेरा कैनवास
यूँ बेरंग दुनिया को देखने से क्या ही हासिल होगा?

लड़ने दो मुझे
ये क़लम मेरी तलवार है और काग़ज़ मेरी युद्धभूमि
यूँ दुनिया के बोझों से डरने में क्या ही हासिल होगा?

जीने दो मुझे
ये क़लम मेरी साँस है और काग़ज़ मेरी नब्ज़
यूँ मरी हुई दुनिया में मर कर क्या ही हासिल होगा?`
  },
  {
    id: 'tu-kaafi-hai',
    title: 'तू काफ़ी है',
    language: 'hindi',
    image: '/poems/eb16c74f-1cfe-4250-9052-7dba3c8cfbe4_rw_1200.jpg',
    date: '2024',
    text: `माना ये रात थोड़ी लंबी है
थोड़ी शांत और थोड़ी गहरी है
ठोकरें ही तो खाएँगे.. और क्या..
पर, तू काफ़ी है

माना ये वक़्त थोड़ा ख़राब है
थोड़ा धीमा और थोड़ा बेताब है
धीरे ही तो चलेंगे.. और क्या..
पर, तू काफ़ी है

तू रो मत, ना हो हताश,
तू काफ़ी है इस अंधेरी रात के लिए,
तू काफ़ी है इस बुरे वक़्त के लिए
क्योंकि..

तू काफ़ी है ख़ुद के लिए!
तुझे ना औरों को कुछ बतलाना है
और ना ही ख़ुद को कुछ दिखाना है
तू पहले भी काफ़ी था.. और
तू अब भी काफ़ी है..
तू काफ़ी है!`
  },
  {
    id: 'pahadon-wala-ghar',
    title: 'पहाड़ों वाला घर',
    language: 'hindi',
    image: '/poems/pahadon-wala-ghar.jpg',
    date: '2026',
    context: `I clicked this back in 2017 on my way back from the Kheerganga trek. This was my "pahadon wala ghar", my escape from reality. I used to look at this photo when life became tough. Thinking one day I will leave the chaos of the world and start living here peacefully. In 2025, I realized to find the "pahadon wala ghar" is not a journey outwards but a journey inwards. Of finding and accepting self.

Here's raising a toast to 2025 and entering 2026 with a new sense of self. May you find your "pahadon wala ghar" too.`,
    text: `ये पहाड़ों वाला घर
मजनूं के पहाड़ों के उस पार
जॉर्डन के दूर एक मैदान में
वीरा के पहाड़ के ऊपर
ये पहाड़ों वाला घर

सोचा था सबने
कहीं भाग के मिलता है ये घर
मजनूं को वक्त से
जॉर्डन को समाज से
और वीरा को घरवालों से
कहीं भाग के ही मिलता है
ये पहाड़ों वाला घर

ढूँढने निकले सब
एक लंबे सफ़र पे
कभी साथ कभी अकेले
दुनिया से दूर
लड़ झगड़ के
फिर भी नहीं मिला
ये पहाड़ों वाला घर

एक दिन सब रुके
बाहर से हारे
तो अंदर चले
जो चाहते थे बाहर
अंदर ही मिला 
मजनूं ने अब हर जगह लैला को पाया 
जॉर्डन ने अपने अंदर के तूफ़ान को अपनाया 
घरवालों से वीरा ने मन में जो था बताया
एक अजीब से शांति मिली 
और ख़ुद ब ख़ुद मिल गया
ये पहाड़ों वाला घर

मेरा भी ऐसा था एक पहाड़ों वाला घर
उन्ही की तरह
पहाड़ के पार खुले मैदान में
ये पहाड़ों वाला घर

मैंने भी सोचा था
कहीं भाग के मिलेगा ये घर
भागता रहा 
भागता रहा उसी की ओर
ये पहाड़ों वाला घर

फिर कुछ सालों बाद जब
जब असली कहानी समझ आई
मैंने भी बाहर से अंदर गाड़ी घुमाई
किससे भाग रहा था
किसे खोज रहा था
जब ये बातें दोहराई
बार बार एक ही आवाज़ आई

मैं

ख़ुद ही ख़ुद से भाग रहा था
ख़ुद पीछे दुनिया आगे लिए जा रहा था
जो मैं था नहीं वो बनता जा रहा था
ख़ुद ही ख़ुद से भाग रहा था

मैं

जब रुका, बैठा, जाना, अपनाया ख़ुद को
बस ऐसे ही
बाहर ढूँढ रहा था जो मुझमे ही मिला 
ये पहाड़ों वाला घर

मैं जहाँ हूँ अब वही है
ये पहाड़ों वाला घर।`
  },
  {
    id: 'born-fearless',
    title: 'Born Fearless',
    language: 'english',
    image: '/poems/born-fearless.jpg',
    date: '2025',
    context: `Born fearless we grow full of doubts.`,
    text: `We are all born fearless,
Carefree, and sure of self.
Somehow end up as full of doubts
Afraid of living, we don't know how.

Were we always like this?
Or change along the way?
When does our confidence falter?
When does the fear creep in?

Is it when we fall down
While learning to walk.

Or when we do something stupid
While learning to be wise.

Is it when we fail at something
While learning to succeed.

Or when we didn't get what we want
While learning new things.

Is it when we get judged by others
While learning to be different.

Or when we have to restart and reset
While learning more about self.

So are we born with these traits
Or at every moment a little fear gets in
And slowly grows inch by inch.
Until the fearless child becomes full of fears
Afraid of things that makes him, him.`
  },
  {
    id: 'still-searching',
    title: 'Still Searching',
    language: 'english',
    image: '/poems/still-searching.jpg',
    date: '2025',
    text: `Going double on a friend's cycle
Papa said that driving car is real happiness.
On my morning commutes, I'm still searching

Dancing on a passing baraat
Bhaiyya said partying in a club is real happiness.
On friday nights, I'm still searching

Sleeping in naani's courtyard in summers
Mama said a high rise apartment is real happiness.
On my 2x2 balcony, I'm still searching

Gulping sukha puri at a corner thela
Bua said eating at a five star is real happiness.
On every occasion, I'm still searching

Now the friend and his cycle is gone
No baraats on the roads anymore
Naani and naani's courtyard both gone
The corner thela is replaced by a mall

And I'm still searching

Still searching for the happiness
that was promised to me
when I was happy`
  },
  {
    id: 'the-last-meeting',
    title: 'The Last Meeting',
    language: 'english',
    image: '/poems/the-last-meeting.jpg',
    date: '2025',
    text: `They make fake promises to not let distance come in their way
But in their minds they know

They tell white lies to talk daily like they do now
But in their minds they know

They make unrealistic plans to visit every month
But in their minds they know

They talk about all the impractical what-ifs
But in their minds they know

In their minds they really know
That for all the what-ifs, and plans, and the lies to stay together

This is the last meeting
And they don't want to let go`
  },
  {
    id: 'itne-saalo-baad',
    title: 'इतने सालों बाद मिले हैं',
    language: 'hindi',
    image: '/poems/itne-saalo-baad.jpg',
    date: '2025',
    text: `इतने सालों बाद मिले हैं, तब भी फ़ोन में
कुछ कहोगे नहीं क्या?

इतनी भी क्या देरी करदी मिलने में
अब तुमसे ज़्यादा
तुम्हारी इस तस्वीर से मोहब्बत हो गयी है`
  },
  {
    id: 'shield',
    title: 'Shield',
    language: 'english',
    image: '/poems/shield.jpg',
    date: '2026',
    text: `People scared me
They were always staring
My every move, they were always judging
 
The way they looked at me
I felt naked
Like they saw through me
 
I am a fluke, an imposter
As if they knew it
 
My truth, my lies
All my imperfections
They pointed at me and laughed
 
I tried to fit in
God knows how hard
 
I tried to talk like them
Walked like them
Even laughed like them
Sometimes I succeeded
But most times I failed
 
The more I faked it
The less I made it
 
Until I saw the shield around me
It was not made of rock but glass
 
The eyes that stared were all my own
The pointing fingers, my own
My own projections
My own thoughts
 
That what was trying to protect me
Was hurting me the most
Maybe I needed it once, but not anymore
 
So I took a rock and broke the shield
And now I am free
I can see now that there was noone as scary as me`
  }
]

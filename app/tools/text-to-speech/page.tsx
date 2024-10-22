// 'use client';

import NotFound from '@/app/not-found';

// import { useEffect, useState } from 'react';
// import { Textarea } from '@/components/ui/textarea';
// import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// const TextToSpeech = () => {
//     const [text, setText] = useState<string>('');
//     const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

//     useEffect(() => {
//         const speak = () => {
//             if (text) {
//                 const utterance = new SpeechSynthesisUtterance(text);
//                 if (voice) {
//                     utterance.voice = voice;
//                 }
//                 window.speechSynthesis.speak(utterance);
//             }
//         };

//         const voices = window.speechSynthesis.getVoices();
//     }, [text])

//     return (
//         <div className="p-6 w-full flex flex-col gap-2">
//             <Textarea
//                 rows={5}
//                 placeholder="Enter Text"
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 className="mb-4"
//             ></Textarea>
//             <Select onValueChange={(value) => setVoice(voices.find((v) => v.name === value) || null)} >
//                 <SelectTrigger>
//                     <SelectValue placeholder="Select Voice" />
//                 </SelectTrigger>
//                 <SelectContent>
//                     {voices.map((v) => (
//                         <SelectItem key={v.name} value={v.name}>{v.name}</SelectItem>
//                     ))}
//                 </SelectContent>
//             </Select>
//             <Button onClick={speak}>Speak</Button>
//         </div>
//     );
// }

// export default TextToSpeech;

export default function Page() {
  return <NotFound />;
}

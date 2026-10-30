import type { IslamicReminder } from '../types'

export const islamicReminders: IslamicReminder[] = [
  {
    arabicText: 'رَبِّ اشْرَحْ لِي صَدْرِي',
    text: 'My Lord, expand for me my chest',
    reference: 'Qur\'an 20:25',
    type: 'quranic'
  },
  {
    arabicText: 'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
    text: 'Indeed, Allah is with the patient ones',
    reference: 'Qur\'an 8:46',
    type: 'quranic'
  },
  {
    arabicText: 'يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ',
    text: 'O mankind, indeed We have created you from male and female',
    reference: 'Qur\'an 49:13',
    type: 'quranic'
  },
  {
    text: 'Do not despise any good deed, even if it is small',
    reference: 'Sahih Muslim 2626',
    type: 'hadith'
  },
  {
    arabicText: 'الصَّبْرُ مِفْتَاحُ الْفَرَجِ',
    text: 'Patience is the key to relief',
    reference: 'Jami\' at-Tirmidhi 2406',
    type: 'hadith'
  },
  {
    arabicText: 'خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ',
    text: 'The best of people are those who benefit others',
    reference: 'Sunan Ibn Majah 4106',
    type: 'hadith'
  },
  {
    arabicText: 'إِذَا فَرَغْتَ فَانصَبْ',
    text: 'When you have finished, strive hard',
    reference: 'Qur\'an 94:7',
    type: 'quranic'
  },
  {
    arabicText: 'وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا',
    text: 'As for those who strive for Us, We shall surely guide them to Our paths',
    reference: 'Qur\'an 29:69',
    type: 'quranic'
  }
]

export function getRandomReminder(): IslamicReminder {
  return islamicReminders[Math.floor(Math.random() * islamicReminders.length)]
}

# SABIR - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 24.x (currently installed)
- npm (comes with Node.js)

### Installation & Development

```bash
# Navigate to project directory
cd d:\Projects\sabir

# Install dependencies (if needed)
npm install

# Start development server with hot reload
npm run dev

# Open browser to http://localhost:5173
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview the production build
npm run preview

# Output is in dist/ folder
```

### Linting

```bash
# Check code quality with Oxlint
npm run lint
```

---

## 📱 Using SABIR

### Main Screen
1. **SABIR Logo** - Top left with Arabic subtitle
2. **Settings Button** - Top right (gear icon)
3. **History Button** - Top right (history icon)
4. **Permanent Signature** - Bottom right: "الْحَمْدُ لِلَّهِ forever"

### Starting a Focus Session

1. **Select Duration**: Click 25m, 50m, 90m, 120m, or enter custom
2. **Set Intention** (optional): Type what you'll focus on
3. **Read Reminder**: See daily Islamic reminder with citation
4. **Press Play**: Green play button starts the timer
5. **Focus**: Timer displays in large format with progress ring

### Timer Controls

| Button | Action |
|--------|--------|
| ▶️ Play | Start or resume session |
| ⏸️ Pause | Pause the timer temporarily |
| ↻ Reset | Stop and reset to selected duration |
| ⛶ Fullscreen | Enter distraction-free mode |

### Settings

Open Settings (gear icon) to:
- **Environment**: Choose Rainy Courtyard, Green Garden, Dawn, or Moonlit Sanctuary
- **Brightness**: Adjust background brightness 0-100%
- **Motion Effects**: Toggle rain animation on/off
- **Ambient Audio**: Enable/disable background audio
- **Notifications**: Toggle completion alerts
- **Clear History**: Wipe all session records (with confirmation)

### Viewing History

Open History (clock icon) to see:
- **Total Sessions**: Number of completed focus sessions
- **Total Time**: Sum of all focus time
- **Today's Time**: Focus time accumulated today
- **Current Streak**: Consecutive days with sessions
- **Recent Sessions**: List of last 10 completed sessions

---

## 🎨 Environments

### Rainy Courtyard (Default)
Beautiful animated rain with mosque architecture in the background. Perfect for deep focus work.

### Green Garden
Peaceful natural environment with foliage and organic elements. Great for creative thinking.

### Dawn
Warm sunrise lighting with atmospheric gradients. Ideal for morning work sessions.

### Moonlit Sanctuary
Serene nighttime mosque with stars and moonlight. Perfect for evening study.

---

## 💾 Data Storage

### What's Saved
- ✅ All completed focus sessions
- ✅ Session duration, intention, and timestamps
- ✅ Your settings preferences
- ✅ History and statistics

### Where It's Stored
- Browser's localStorage
- Local to your device only
- No internet required after first load
- No data sent to any server

### Clearing Data
1. Open Settings (gear icon)
2. Scroll to "Clear History" button
3. Confirm deletion
4. All session records will be permanently deleted

---

## 🔔 Notifications

### Browser Notifications
- When a focus session completes, you'll get a notification
- Requires permission on first use (accept in browser prompt)
- Can be disabled in Settings

### Session Completion
- Timer reaches zero
- Browser notification sent (if enabled)
- Session automatically saved to history
- Start next session immediately or take a break

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Esc` | Close any modal (Settings, History) |
| `Tab` | Navigate between buttons |
| `Enter` | Activate focused button |

---

## 📊 Statistics Explained

### Total Sessions
Number of completed focus sessions (not abandoned ones).

### Total Time
Sum of all focus time across all sessions in minutes.

### Today's Time
How many minutes you've focused on today (resets at midnight).

### Streak
Number of consecutive days with at least one completed focus session.

### Recent Sessions
Shows your last 10 completed sessions with:
- Session intention (if you set one)
- Actual time spent
- Date completed

---

## 🌙 Islamic Content

SABIR includes authentic Islamic reminders:

### Qur'anic Verses
Direct quotations from the Qur'an with proper surahs and ayah numbers.

### Hadith
Verified hadith from authentic collections with proper references.

### Authenticity
- No fabricated quotations
- All content properly attributed
- Citations include source references
- Beautiful Arabic with RTL rendering

---

## 🌐 Deployment to GitHub Pages

### Setup
1. Create a new GitHub repository
2. Push the code to your repository
3. Enable GitHub Pages in repository settings
4. Select `dist` folder as source

### Build & Deploy
```bash
npm run build
# Upload dist/ folder to GitHub Pages
```

---

## 🐛 Troubleshooting

### Timer Not Saving
- Check browser localStorage is enabled
- Clear browser cache and reload
- Try different browser

### Notifications Not Working
- Grant permission when browser asks
- Check device notification settings
- Enable in Settings panel

### Environment Not Changing
- Verify Settings panel is updating
- Refresh page to reload
- Check browser console for errors

### History Not Showing
- Ensure sessions were completed (not just paused)
- Check localStorage isn't full
- Try clearing browser cache

---

## 📖 Feature Reference

| Feature | How to Use |
|---------|-----------|
| Select Duration | Click duration buttons or custom input |
| Add Intention | Type in "What will you focus on?" field |
| Start Timer | Press play button |
| Pause Timer | Press pause button during session |
| Resume Session | Press play to continue paused session |
| Reset Timer | Press reset button (↻) |
| Change Environment | Settings > Environment |
| Adjust Brightness | Settings > Brightness slider |
| Toggle Motion | Settings > Motion Effects toggle |
| Enable Audio | Settings > Ambient Audio toggle |
| Get Notifications | Settings > Notifications toggle |
| View Stats | Open History button |
| Clear All Data | Settings > Clear History |

---

## 🎯 Best Practices

### For Optimal Focus
1. Set a clear intention for your session
2. Choose an environment that helps you focus
3. Disable notifications from other apps
4. Use fullscreen mode if available
5. Keep your device in full screen

### For Tracking Progress
1. Complete full sessions (avoid pause > reset)
2. Set meaningful intentions
3. Check history weekly to see trends
4. Try to build a streak

### For Accessibility
1. Use keyboard navigation if preferred
2. Adjust brightness to your comfort level
3. Toggle motion effects if you find them distracting
4. Use system-level reduced motion settings

---

## 🆘 Support

### Common Issues

**Q: My history disappeared**  
A: Check browser settings. Some browsers clear localStorage when you clear browsing data. Disable clearing localStorage in your browser's privacy settings.

**Q: Timer seems inaccurate**  
A: Timer uses device timestamp. Check your system clock is correct. Accuracy is ±1 second.

**Q: Environmental effects are sluggish**  
A: Try toggling Motion Effects off in Settings for better performance.

**Q: Arabic text looks strange**  
A: Ensure your browser supports Unicode and RTL text. Most modern browsers do automatically.

---

## 📝 Tips & Tricks

1. **Custom Duration**: Type any duration you want in the input field
2. **Intention Tracking**: Use specific intentions to track what you work on
3. **Streak Building**: Try to complete at least one session every day
4. **Dark Mode Friendly**: All environments work great for evening focus
5. **Mobile Sessions**: Perfect for focused study sessions on your phone/tablet

---

## 🙏 Remember

> "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ"  
> "Indeed, Allah is with the patient ones." — Qur'an 8:46

SABIR is designed to help you maintain focus and intention in your work and study. Take breaks, stay hydrated, and remember the purpose behind your effort.

الْحَمْدُ لِلَّهِ forever.

---

**SABIR (صابر)** — Your Islamic focus companion.  
Built for productivity. Designed for peace.

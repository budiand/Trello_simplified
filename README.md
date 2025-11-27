# Trello_simplified
Homework for Startup Engineer course

🔗 **Vercel app:**  
https://trellosimplified22-git-main-budiands-projects.vercel.app

---

## 📊 Metrics with PostHog

I chose PostHog for metric collection because it is easy to use and offers
a wide variety of metrics to track.

I chose to track how many people go from creating a board to creating a card 
because it shows if the app is easy to use or not. If users stop somewhere on the
way, it probably means something is confusing. These metrics can help me later
to improve how the app looks and works, and maybe make it better overall.

---

## 🛠️ How the app works

The app was made using Next.js and MongoDB. I created API routes for boards,
lists and cards, and each of them saves or loads data from the database.
For the design I used Tailwind and DaisyUI because they are easy to use and
make the page look better without writing too much CSS.

The user can create boards, open them, add lists and then add cards inside
those lists. Everything basically sends a request to the backend and updates
the database. I also added PostHog to track when someone creates a board, a list
or a card. With these events I made a small funnel to see how users move through
the app and where they stop.

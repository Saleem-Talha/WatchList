# WatchList  

## Project Overview  
This project implements **WatchList**, a modern web application for tracking movies, series, and anime. The platform enables users to maintain a personal watchlist—organizing items as planned, watching, or completed—while remaining lightweight, private, and ad-free. It is developed using **Next.js** for the frontend and **Node.js** for backend services, with a **custom cron scheduler** for managing automated email notifications.

---

## Problem and Proposed Solution  

### Problem  
Media tracking platforms often suffer from unnecessary complexity, intrusive advertisements, and poor privacy standards. Users seeking a simple yet effective solution to manage their personal entertainment queues frequently find existing platforms overengineered or data-driven. Additionally, reminder systems for upcoming watch times are typically unavailable or unreliable.

### Proposed Solution  
WatchList addresses these issues by providing a minimalistic, privacy-respecting application that focuses on simplicity and user control. It features a clean interface built with Next.js and TailwindCSS, a Node.js backend for data and email management, and a scheduled mailing system using cron jobs. The email system provides reminders for planned watches—both ahead of time and at the exact viewing time—enhancing engagement and usability.

---

## Summary  
**WatchList** is designed as a personal tracker for users who wish to organize and follow their viewing habits without external clutter or tracking. The system integrates a structured frontend and backend to create a cohesive experience.  

The **frontend** utilizes Next.js to deliver fast rendering, modular components, and a responsive interface. Visuals are managed through reusable components such as PreviewRow, StatsCard, and FeatureCards, styled via TailwindCSS for consistency.  

The **backend** employs Node.js to handle data storage, user authentication, and scheduling. A **custom cron scheduler** manages reminder tasks, dispatching emails at predefined intervals—typically 30–60 minutes before a planned viewing and at the event’s start.  

Together, these systems create a smooth, self-contained application that allows users to plan, organize, and follow their entertainment activities efficiently.

---

## Key Results  
1. Implemented a clean and efficient UI with reusable modular components in Next.js.  
2. Integrated a reliable Node.js-based backend with an automated mailing system.  
3. Developed a cron-based scheduling mechanism for sending timed email reminders.  
4. Ensured privacy by excluding ads, analytics trackers, and third-party data collection.  

---

## Technical Strengths and Weaknesses  

### Strengths  
- Modular and maintainable code architecture using React components.  
- Responsive and accessible interface built with TailwindCSS.  
- Efficient task automation through a cron scheduler for mailing.  
- Secure and private design with no tracking or advertisement modules.  

---

## Suggestions for Future Work  
1. **Database Integration Enhancements**: Extend support for persistent user data through relational or NoSQL databases.  
2. **Advanced Scheduling**: Allow user-defined reminder intervals beyond predefined values.  
3. **API Expansion**: Introduce REST or GraphQL APIs for third-party integrations and mobile applications.  
4. **Performance Optimization**: Implement caching layers and load balancing for improved scalability.  
5. **Analytics and Insights**: Provide optional user analytics while preserving privacy through anonymized local storage.  

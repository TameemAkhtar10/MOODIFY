import Player from '../components/Player'
import { UseSong } from '../hooks/UseSong'
import { useAuth } from '../../Auth/hooks/Useauth'
import FaceExpression from '../../Expression/Components/FaceExpression'
import MoodAnalytics from '../components/MoodAnalytics'
import '../Home.scss'

const moodList = [
  { label: 'Happy',     emoji: '😄', value: 'happy' },
  { label: 'Sad',       emoji: '🥺', value: 'sad' },
  { label: 'Calm',      emoji: '😌', value: 'calm' },
  { label: 'Neutral',   emoji: '😐', value: 'neutral' },
  { label: 'Angry',     emoji: '😠', value: 'angry' },
  { label: 'Surprised', emoji: '😮', value: 'surprised' },
]

const Home = () => {
  const { song, loading, handlegetsong, handlefavorite, history, favorites, moodStats } = UseSong()
  const { user, handlelogout } = useAuth()

  return (
    <div className="home">
      <aside className="sidebar">
        <div className="sidebar__logo">
          <div className="sidebar__logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
          <span>Moodify</span>
        </div>

        <nav className="sidebar__nav">
          <p className="sidebar__nav-label">Your Mood</p>
          {moodList.map((m) => (
            <button
              key={m.value}
              className={`sidebar__mood-btn ${song?.mood === m.value ? 'active' : ''}`}
              onClick={() => handlegetsong({ mood: m.value })}
            >
              <span className="sidebar__mood-emoji">{m.emoji}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </nav>

        {favorites.length > 0 && (
          <div className="sidebar__favorites">
            <p className="sidebar__nav-label">❤️ Favorites</p>
            {favorites.map((s) => (
              <div key={s._id} className="sidebar__history-item">
                <img src={s.posterurl} alt={s.title} className="sidebar__history-img" />
                <div className="sidebar__history-info">
                  <span className="sidebar__history-title">{s.title}</span>
                  <span className="sidebar__history-mood sidebar__history-mood--fav">{s.mood}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {history.length > 0 && (
          <div className="sidebar__history">
            <p className="sidebar__nav-label">Recent</p>
            {history.map((s) => (
              <div key={s._id} className="sidebar__history-item">
                <img src={s.posterurl} alt={s.title} className="sidebar__history-img" />
                <div className="sidebar__history-info">
                  <span className="sidebar__history-title">{s.title}</span>
                  <span className="sidebar__history-mood">{s.mood}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="sidebar__footer">
          <div className="sidebar__user">
            <div className="sidebar__avatar">
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <div className="sidebar__user-info">
              <span className="sidebar__user-name">{user?.username}</span>
              <span className="sidebar__user-role">Listener</span>
            </div>
          </div>
          <button className="sidebar__logout" onClick={handlelogout} title="Logout">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </aside>

      <div className="home__main">
        <header className="home__topbar">
          <div className="home__topbar-left">
            <h1 className="home__greeting">
              Hey, <span>{user?.username}</span> 👋
            </h1>
            <p className="home__subtitle">Let your mood pick your music.</p>
          </div>
          <div className="home__topbar-badge">
            <span className="home__topbar-dot" />
            Mood Detection Active
          </div>
        </header>

        <div className="home__content">
          <div className="home__panel home__panel--camera">
            <div className="home__panel-header">
              <span className="home__panel-dot" />
              <h2>Face Scanner</h2>
            </div>
            <div className="home__camera-body">
              <FaceExpression />
            </div>
          </div>

          <div className="home__right-col">
            <div className="home__panel home__panel--player">
              <div className="home__panel-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                  <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none" />
                </svg>
                <h2>Now Playing</h2>
              </div>
              <div className="home__player-body">
                {loading && (
                  <div className="home__loading">
                    <div className="home__bars">
                      {[...Array(6)].map((_, i) => (
                        <span key={i} style={{ animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                    <p>Finding your vibe...</p>
                  </div>
                )}
                {!loading && !song && (
                  <div className="home__empty">
                    <div className="home__empty-icon">🎵</div>
                    <h3>No song yet</h3>
                    <p>Detect your mood or pick one from the sidebar.</p>
                  </div>
                )}
                {!loading && song && <Player song={song} />}
              </div>
            </div>

            <div className="home__panel home__panel--analytics">
              <div className="home__panel-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
                <h2>Mood Analytics</h2>
              </div>
              <div className="home__analytics-body">
                <MoodAnalytics moodStats={moodStats} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
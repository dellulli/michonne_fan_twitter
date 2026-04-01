import { useEffect, useMemo, useState } from 'react'
import logoImg from './assets/logo.png'
import pfpImg from './assets/pfp.jpg'
import michonne1 from './assets/michonne/michonne1.png'
import michonne2 from './assets/michonne/michonne2.jpg'
import michonne3 from './assets/michonne/michonne3.jpg'
import michonne4 from './assets/michonne/michonne4.jpg'
import jakeEdit1 from './jake_edits/jake_sully_edit.mov'
import jakeEdit2 from './jake_edits/jake_Edit_2.mov'
import jakeEdit3 from './jake_edits/jake_edit_3.mov'
import jakeEdit4 from './jake_edits/jake_edit_4.mov'
import commentPhoto1 from './assets/comment_photo1.png'
import commentPhoto2 from './assets/comment_photo2.png'
import './App.css'

function App() {
  const userCommentStorageKey = 'hotmichonnepics_user_comments_v1'
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState(null)
  const [isAgeVerified, setIsAgeVerified] = useState(false)
  const [birthMonth, setBirthMonth] = useState('')
  const [birthDay, setBirthDay] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [gateResult, setGateResult] = useState(null)
  const [isCommentComposerOpen, setIsCommentComposerOpen] = useState(false)
  const [commentDraft, setCommentDraft] = useState('')
  const [userCommentsByPost, setUserCommentsByPost] = useState(() => {
    try {
      const saved = localStorage.getItem(userCommentStorageKey)
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  const posts = useMemo(
    () => [
      {
        id: 1,
        image: michonne1,
        caption: '#sexy #R-rated #mommy #goddess',
        video: jakeEdit1,
        message: 'Hottest new pic of michonne just dropped 🔥. Click to View.',
        revealCaption: 'APRIL FOOLS YOU MICHONNE FREAK, you rlly thought you were going to get photos of her 🤣🤣🤣🤣',
        comments: [
          { type: 'text', text: '@michonnegooner255: bro actually fell for this 🤣🤣' },
          { type: 'text', text: '@tanka_jahari04: i opened this on max volume rip' },
        ],
      },
      {
        id: 2,
        image: michonne2,
        caption: '#wife #beautiful #shiningstar #amazingpieceofart',
        video: jakeEdit2,
        message: 'New yorking material just came out 💦. Click to View.',
        revealCaption: 'APRIL FOOLS U PERVERT 🤣🤣🤣🤣🤣',
        comments: [
          { type: 'text', text: '@jakesullylover35: how does bro keep falling for these 🤣🤣' },
          { type: 'image', text: '@rickgrimesstan: I can explain guys', image: commentPhoto1 },
        ],
      },
      {
        id: 3,
        image: michonne3,
        caption:
          '#stunning #mommythatwasascendedfromabove #blessedme #beautifulhumanbeing',
        video: jakeEdit3,
        message: 'I post free Michonne content every day at 3pm EST. Follow for more content like this ❗. Click to View.',
        revealCaption: 'why is bro still trying to see photos of her 🤣🤣🤣🤣',
        comments: [
          { type: 'image', text: '@poopbestie23:', image: commentPhoto2 },
          { type: 'text', text: '@McLovin: just face it you\'re never getting these michonne pics bro 😭🙏' },
        ],
      },
      {
        id: 4,
        image: michonne4,
        caption:
          '#mostperfectpersontowalkupontheearth #breaththesameair #iamtweaking',
        video: jakeEdit4,
        message: 'Newest drop of the week 😛. Click to View.',
        revealCaption: 'Jake sully is the coolest #aprilfools🤣🤣',
        comments: [
          { type: 'text', text: '@Mamal_loves_bowling23: Luke please stop trying to search up this woman\'s photos on twitter, I am concerned.' },
          { type: 'text', text: '@STR4HM: yorking to jake rn 😼' },
        ],
      },
    ],
    [commentPhoto1, commentPhoto2],
  )

  const openGate = (postId) => {
    setIsModalOpen(true)
    setSelectedPostId(postId)
    setIsCommentComposerOpen(false)
    setCommentDraft('')
    if (isAgeVerified) {
      setGateResult('allowed')
    } else {
      setBirthMonth('')
      setBirthDay('')
      setBirthYear('')
      setGateResult(null)
    }
  }

  const closeGate = () => {
    setIsModalOpen(false)
    setSelectedPostId(null)
    setIsCommentComposerOpen(false)
    setCommentDraft('')
    setBirthMonth('')
    setBirthDay('')
    setBirthYear('')
    setGateResult(null)
  }

  useEffect(() => {
    localStorage.setItem(userCommentStorageKey, JSON.stringify(userCommentsByPost))
  }, [userCommentsByPost])

  const selectedPost = posts.find((post) => post.id === selectedPostId)

  const addEmojiToDraft = (emoji) => {
    setCommentDraft((current) => `${current}${emoji}`)
  }

  const handleCommentSubmit = (event) => {
    event.preventDefault()

    const trimmedComment = commentDraft.trim()
    if (!trimmedComment || !selectedPostId) {
      return
    }

    setUserCommentsByPost((current) => {
      const existing = current[selectedPostId] ?? []
      return {
        ...current,
        [selectedPostId]: [...existing, trimmedComment],
      }
    })
    setCommentDraft('')
    setIsCommentComposerOpen(false)
  }

  const handleYearSubmit = (event) => {
    event.preventDefault()

    if (!birthMonth || !birthDay || !birthYear) {
      setGateResult('invalid')
      return
    }

    const year = Number.parseInt(birthYear, 10)
    const day = Number.parseInt(birthDay, 10)
    if (!Number.isInteger(year) || !Number.isInteger(day)) {
      setGateResult('invalid')
      return
    }

    if (year >= 2006) {
      setGateResult('blocked')
      return
    }

    setGateResult('allowed')
    setIsAgeVerified(true)
  }

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const days = Array.from({ length: 31 }, (_, index) => String(index + 1))
  const years = Array.from({ length: 127 }, (_, index) => String(2026 - index))

  return (
    <div className="x-shell">
      <header className="x-topbar">
        <img src={logoImg} alt="X style logo" className="x-logo" />
        <div className="x-title-wrap">
          <h1>@hotmichonnepics</h1>
          <p>18.4K followers · Michonne fan account</p>
        </div>
      </header>

      <main className="x-feed">
        {posts.map((post) => (
          <article className="tweet-card" key={post.id}>
            <div className="tweet-head">
              <img src={pfpImg} alt="Profile avatar" className="tweet-avatar" />
              <div>
                <h2>hotmichonnepics</h2>
                <p>@hotmichonnepics · 1m</p>
              </div>
            </div>

            <p className="tweet-text">
              {post.message}
            </p>
            <p className="tweet-tags">{post.caption}</p>

            <button className="blur-card" onClick={() => openGate(post.id)}>
              <img src={post.image} alt="Blurred preview post" />
              <div className="blur-overlay">Click to view</div>
            </button>
          </article>
        ))}
      </main>

      {isModalOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <section className="modal-card">
            <button className="close-btn" onClick={closeGate} aria-label="Close">
              ×
            </button>

            <div className="modal-content">
              {!gateResult && (
                <form onSubmit={handleYearSubmit} className="gate-form">
                  <h3>Age Check</h3>
                  <p>Select your date of birth to continue.</p>

                  <div className="dob-row">
                    <label>
                      <span>Month</span>
                      <select
                        value={birthMonth}
                        onChange={(event) => setBirthMonth(event.target.value)}
                      >
                        <option value="">Month</option>
                        {months.map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      <span>Day</span>
                      <select
                        value={birthDay}
                        onChange={(event) => setBirthDay(event.target.value)}
                      >
                        <option value="">Day</option>
                        {days.map((day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      <span>Year</span>
                      <select
                        value={birthYear}
                        onChange={(event) => setBirthYear(event.target.value)}
                      >
                        <option value="">Year</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <button type="submit">Continue</button>
                </form>
              )}

              {gateResult === 'invalid' && (
                <div className="gate-message">
                  <p>Please select a complete valid date of birth.</p>
                  <button type="button" onClick={() => setGateResult(null)}>
                    Try again
                  </button>
                </div>
              )}

              {gateResult === 'blocked' && (
                <div className="gate-message">
                  <p>aw you're a baby, you can't watch this R rated content 🥹</p>
                  <button type="button" onClick={closeGate}>
                    Close
                  </button>
                </div>
              )}

              {gateResult === 'allowed' && selectedPostId && (
                <div className="video-reveal">
                  <video src={selectedPost?.video} controls autoPlay playsInline />
                  <p>
                    {selectedPost?.revealCaption}
                  </p>
                  <p className="reveal-tags">
                    #michonnefiend #aprilfools #loser #jakesullybetterthanrick
                    #jakesullysohot🤤 #majake🤰
                  </p>

                  <section className="comment-feed" aria-label="Comments">
                    <div className="comment-head">
                      <h4>Comments</h4>
                      <button
                        type="button"
                        className="comment-add-btn"
                        aria-label="Add comment"
                        onClick={() =>
                          setIsCommentComposerOpen((current) => !current)
                        }
                      >
                        +
                      </button>
                    </div>

                    {isCommentComposerOpen && (
                      <form className="comment-composer" onSubmit={handleCommentSubmit}>
                        <p>@michonne_pervert231</p>
                        <textarea
                          placeholder="Write a comment..."
                          value={commentDraft}
                          onChange={(event) => setCommentDraft(event.target.value)}
                          rows={3}
                        />
                        <div className="emoji-row">
                          {['🤣', '😭', '😼', '🔥', '💦', '🙏'].map((emoji) => (
                            <button
                              key={emoji}
                              type="button"
                              className="emoji-btn"
                              onClick={() => addEmojiToDraft(emoji)}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                        <button type="submit" className="comment-post-btn">
                          Post
                        </button>
                      </form>
                    )}

                    {selectedPost?.comments?.map((comment, idx) => (
                      <div key={idx} className="comment-item">
                        {comment.type === 'text' && <p>{comment.text}</p>}
                        {comment.type === 'image' && (
                          <>
                            <p>{comment.text}</p>
                            <img src={comment.image} alt="Comment" className="comment-image" />
                          </>
                        )}
                      </div>
                    ))}

                    {(userCommentsByPost[selectedPostId] ?? []).map((comment, idx) => (
                      <div key={`user-${idx}`} className="comment-item">
                        <p>@michonne_pervert231: {comment}</p>
                      </div>
                    ))}
                  </section>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default App

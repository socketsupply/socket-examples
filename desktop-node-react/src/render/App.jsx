import React, { useEffect, useState } from "react";
import { AuthProvider, useAuth, AuthStatus } from "@w3ui/react-keyring";
import { UploaderProvider, useUploader } from "@w3ui/react-uploader";
import "./App.css";

function useEvent(event, handler, passive = false) {
  useEffect(() => {
    window.addEventListener(event, handler, passive);
    return function cleanup() {
      window.removeEventListener(event, handler);
    }
  });
}

function App() {
  const [messageCounter, setMessageCounter] = useState(0)
  const [timerCounter, setTimerCounter] = useState(0)
  const [clickCounter, setClickCounter] = useState(0)
  useEvent('counter increase', (e) => {
    setMessageCounter(e.detail.counter)
    switch (e.detail.type) {
      case 'timer': {
        setTimerCounter(timerCounter + 1)
        break;
      }
      case 'click': {
        setClickCounter(clickCounter + 1)
        break;
      }
    }
  })
  return (
    <>
      <AuthProvider>
        <UploaderProvider>
          <IdentityLoader>
            <Uploader />
          </IdentityLoader>
        </UploaderProvider>
      </AuthProvider>
      <div>
        Messages sent from the main process: {messageCounter} ({clickCounter}{" "}
        clicks, {timerCounter} automatic (once per 5 seconds))
      </div>
      <button
        className="button-increase"
        onClick={async () => {
          const result = await window.system.send("increase counter");
          console.log(`Result: ${result}`);
        }}
      >
        Increase counter from the render process
      </button>
    </>
  );
}

function MyUploader() {
  const [{ uploadedCarChunks }, uploader] = useUploader();
  const [file, setFile] = useState(null);
  const [dataCid, setDataCid] = useState('')
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);

  if (!uploader) return null;

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus("uploading");
      const cid = await uploader.uploadFile(file);
      setDataCid(cid);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setStatus("done");
    }
  };
  
  return (
    <form onSubmit={handleUploadSubmit}>
      <div className="db mb3">
        <label htmlFor="file" className="db mb2">
          File:
        </label>
        <input
          id="file"
          className="db pa2 w-100 ba br2"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
      </div>
      <button type="submit" className="ph3 pv2">
        Upload
      </button>
    </form>
  );
}

const Uploader = withIdentity(MyUploader);

export function withIdentity (Component) {
  return props => (
    <Authenticator>
      <Component {...props} />
    </Authenticator>
  )
}

function Authenticator ({ children }) {
  const { authStatus, identity, registerAndStoreIdentity, cancelRegisterAndStoreIdentity } = useAuth()
  const [email, setEmail] = useState('')

  if (authStatus === AuthStatus.SignedIn) {
    return children
  }

  if (authStatus === AuthStatus.EmailVerification) {
    return (
      <div>
        <h1 className='near-white'>Verify your email address!</h1>
        <p>Click the link in the email we sent to {identity && identity.email} to sign in.</p>
        <form onSubmit={e => { e.preventDefault(); cancelRegisterAndStoreIdentity() }}>
          <button type='submit' className='ph3 pv2'>Cancel</button>
        </form>
      </div>
    )
  }

  const handleRegisterSubmit = async e => {
    e.preventDefault()
    try {
      await registerAndStoreIdentity(email)
    } catch (err) {
      throw new Error('failed to register', { cause: err })
    }
  }

  return (
    <form onSubmit={handleRegisterSubmit}>
      <div className='mb3'>
        <label htmlFor='email' className='db mb2'>Email address:</label>
        <input id='email' className='db pa2 w-100' type='email' value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <button type='submit' className='ph3 pv2'>Register</button>
    </form>
  )
}

function IdentityLoader({ children }) {
  const { loadDefaultIdentity } = useAuth();
  // eslint-disable-next-line
  useEffect(() => {
    loadDefaultIdentity();
  }, []); // try load default identity - once.
  return children;
}

export default App;

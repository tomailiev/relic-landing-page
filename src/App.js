import './App.css';
import {  CssBaseline, ThemeProvider } from '@mui/material';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import '@fontsource/lato/300.css';
import '@fontsource/lato/400.css';
import '@fontsource/julius-sans-one/400.css';
import '@fontsource/lato/400-italic.css';
import '@fontsource/lato/700.css';
import NotificationContext from './context/NotificationContext';
import { useState } from 'react';
import Notification from './components/Common/Notification';
import Events from './components/Events/Events';
import ActionCenter from './components/Common/ActionCenter';
import DialogContext from './context/DialogContext';
import CommonDialog from './components/Common/CommonDialog';
import Musicians from './components/Musicians/Musicians';
import Story from './components/About/Story';
import texts from './data/texts';
import TextContext from './context/TextContext';
import { useEffect } from 'react';
import { downloadOneDoc, getLink } from './utils/firebase/firestore-funcs';
import Contact from './components/Contact/Contact';
import LoadingContext from './context/LoadingContext';
import LoadingBackdrop from './components/Common/LoadingBackdrop';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import NoMatch from './components/Common/NoMatch';
import Journey from './components/Journey/Journey';
import Support from './components/Support/Support';
import DonorLevels from './components/Support/DonorLevels';
// import Host from './components/Support/Host';
import { pdfjs } from 'react-pdf';
import DonateForm from './components/Common/DonateForm';
import SubscribeForm from './components/Common/SubscribeForm';
import ProgramDialog from './components/Events/ProgramDialog';
import MusicianDialog from './components/Musicians/MusicianDialog';
import Videos from './components/Videos/Videos';
import Photos from './components/Photos/Photos';
import { currentSeason } from './data/currentSeason';
import { HeaderHeightProvider } from './components/Header/HeatherHeightProvider';
import EventPage from './components/Events/EventPage';
import { theme } from './data/theme';


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


function App() {

  const [notification, setNotification] = useState(null);
  const [dialog, setDialog] = useState(null);
  const [text, setText] = useState(texts);
  const [loading, setLoading] = useState(false);
  const [dialogProps, setDialogProps] = useState(null);

  useEffect(() => {
    downloadOneDoc('textContent', 'allTexts')
      .then(doc => {
        if (doc) {
          setText(doc);
          return;
        };
        setText(texts);
      })
      .catch(e => {
        setText(texts);
      })
  }, []);

  const missionTexts = [
    { textContent: text.aboutMission },
    { textContent: text.aboutValues }
  ];

  const bioTexts = [
    { textContent: text.aboutNewBio },
    { textContent: text.aboutNewBio2 },
    { textContent: text.aboutNewBio3 }
  ];

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has('dialog')) {
      const dialogType = searchParams.get('dialog');
      switch (dialogType) {
        case 'donation':
          setDialog({ type: 'donation', title: 'support relic', component: <DonateForm /> });
          break;
        case 'subscription':
          setDialog({ type: 'subscription', component: <SubscribeForm /> });
          break;
        case 'programBook':
          const eventId = searchParams.get('eventId');
          if (!eventId) return;
          downloadOneDoc('events', eventId)
            .then(event => {
              if (event.program) {
                setDialogProps({ title: event.title })
                return getLink(event.program)
              }
              return Promise.resolve(null);
            })
            .then(value => {
              if (value) {
                setDialog({ title: dialogProps?.title, component: <ProgramDialog file={value} />, type: 'program' });
              }
            })
            .catch(e => console.log(e))
          break;
        case 'musician':
          const musicianId = searchParams.get('musicianId');
          if (!musicianId) return;
          downloadOneDoc('musicians', musicianId)
            .then(musician => {
              if (musician) {
                setDialogProps({ title: musician.name, bio: musician.bio });
                return getLink(musician.pic);
              }
              return Promise.resolve(null);
            })
            .then(value => {
              if (value) {
                setDialog({ type: 'bio', component: <MusicianDialog name={dialogProps?.title} src={value} bio={dialogProps?.bio || ''} />, title: dialogProps?.title });
              }
            })
            .catch(e => console.log(e))
          break;
        default:
          break;
      }
    }

  }, [location.search, dialogProps?.title, dialogProps?.bio])


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <TextContext.Provider value={{ text, setText }}>
          <LoadingContext.Provider value={{ loading, setLoading }}>
            <NotificationContext.Provider value={{ notification, setNotification }}>
              <DialogContext.Provider value={{ dialog, setDialog }}>
                <HeaderHeightProvider>
                  <LoadingBackdrop />
                  <Notification />
                  <CommonDialog />
                  <CssBaseline />
                  <Header location={location} />
                  <TransitionGroup component={null}>
                    <CSSTransition key={location.key} classNames="fade" timeout={300}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about/mission" element={<Story content={missionTexts} pageTitle={'Mission & Values'} />} />
                        <Route path="/about/bio" element={<Story content={bioTexts} pageTitle={'About Us'} />} />
                        <Route path="/about/musicians" element={<Musicians />} />
                        <Route path='/about/journey' element={<Journey />} />
                        <Route path="/events/:season" element={<Events />} />
                        <Route path='/support/donate' element={<Support />} />
                        <Route path={'/support/tiers'} element={<DonorLevels />} />
                        {/* <Route path={'/support/host'} element={<Host />} /> */}
                        <Route path={'/media/photos'} element={<Photos />} />
                        <Route path='/media/videos' element={<Videos />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path={'/support/levels'} element={<Navigate to={'/support/tiers'} />} />
                        <Route path="/donate" element={<Navigate to={'/support/donate'} />} />
                        <Route path="/events" element={<Navigate to={`/events/${currentSeason}`} />} />
                        <Route path='/event/:eventId' element={<EventPage />} />
                        <Route path="/event" element={<Navigate to={`/events/${currentSeason}`} />} />
                        <Route path="*" element={<NoMatch />} />
                      </Routes>
                    </CSSTransition>
                  </TransitionGroup>
                  {location.pathname !== '/support' && <ActionCenter />}
                  <Footer />
                </HeaderHeightProvider>
              </DialogContext.Provider>
            </NotificationContext.Provider>
          </LoadingContext.Provider>
        </TextContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;

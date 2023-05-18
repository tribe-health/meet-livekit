import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

interface TabsProps {
  children: ReactElement[];
  selectedIndex?: number;
  onTabSelected?: (index: number) => void;
}

function Tabs(props: TabsProps) {
  const activeIndex = props.selectedIndex ?? 0;
  if (!props.children) {
    return <></>;
  }

  let tabs = React.Children.map(props.children, (child, index) => {
    return (
      <button
        className="lk-button"
        onClick={() => {
          if (props.onTabSelected) props.onTabSelected(index);
        }}
        aria-pressed={activeIndex === index}
      >
        {child?.props.label}
      </button>
    );
  });
  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabSelect}>{tabs}</div>
      {props.children[activeIndex]}
    </div>
  );
}

function DemoMeetingTab({ label }: {
  label: string,
}) {
  const router = useRouter();

  const [roomName, setRoomName] = useState<string | undefined>();
  const startMeeting = () => {
    router.push(`/rooms/${roomName}`);
  };

  let roomLabel = 'Room name';
  return (
    <div className={styles.tabContent}>
      <p style={{ marginTop: 0 }}>
        <input
          className="lk-form-control"
          id="roomname"
          name="roomname"
          type="text"
          placeholder={roomLabel}
          onChange={(inputEl) => setRoomName(inputEl.target.value)}
          autoComplete="off"
        />
      </p>
      <button disabled={roomName === undefined || roomName.length === 0} className="lk-button" onClick={startMeeting}>
        Start Meeting
      </button>
    </div>
  );
}

function CustomConnectionTab({ label }: { label: string }) {
  const [liveKitUrl, setLiveKitUrl] = useState<string | undefined>();
  const [token, setToken] = useState<string | undefined>();

  const router = useRouter();
  const join = () => {
    router.push(`/custom/?liveKitUrl=${liveKitUrl}&token=${token}`);
  };
  return (
    <div className={styles.tabContent}>
      <p style={{ marginTop: 0 }}>
        Connect LiveKit Meet with a custom server using LiveKit Cloud or LiveKit Server.
      </p>
      {/* <label>LiveKit URL</label> */}
      <input type="url" placeholder="URL" onChange={(ev) => setLiveKitUrl(ev.target.value)}></input>
      {/* <label>Token</label> */}
      <input type="text" placeholder="Token" onChange={(ev) => setToken(ev.target.value)}></input>
      <hr
        style={{ width: '100%', borderColor: 'rgba(255, 255, 255, 0.15)', marginBlock: '1rem' }}
      />
      <button
        style={{
          paddingInline: '1.25rem',
          width: '100%',
        }}
        className="lk-button"
        onClick={join}
      >
        Connect
      </button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{ tabIndex: number }> = async ({
  query,
  res,
}) => {
  res.setHeader('Cache-Control', 'public, max-age=7200');
  const tabIndex = query.tab === 'custom' ? 1 : 0;
  return { props: { tabIndex } };
};

const Home = ({ tabIndex }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  function onTabSelected(index: number) {
    const tab = index === 1 ? 'custom' : 'demo';
    router.push({ query: { tab } });
  }
  return (
    <>
      <main className={styles.main} data-lk-theme="default">
        <div className="header">
          <img src="/images/Tribe_Meet_Core.png" alt="Tribe Meet" width="360" height="45" />
          <h2>
            Open source video conferencing app built on{' '}
            <a href="https://github.com/tribe-health/components-js?ref=meet" rel="noopener">
              Tribe Core and LiveKit&nbsp;Components
            </a>
            ,{' '}
            <a href="https://meet.tribecore.io/" rel="noopener">
              TribeCore&nbsp;Cloud
            </a>{' '}
            and Next.js.
          </h2>
        </div>

          <DemoMeetingTab label="Demo" />

      </main>
      <footer data-lk-theme="default">
        Hosted on{' '}
        <a href="https://meet.tribecore.io/" rel="noopener">
          Tribe Core
        </a>
        . Source code on{' '}
        <a href="https://github.com/tribe-health/meet?ref=meet" rel="noopener">
          GitHub
        </a>
        .
      </footer>
    </>
  );
};

export default Home;

function generateRoomId(): string {
  return `${randomString(4)}-${randomString(4)}`;
}

function randomString(length: number): string {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

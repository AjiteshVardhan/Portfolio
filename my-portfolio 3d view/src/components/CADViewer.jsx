import React, { Suspense } from 'react'

const CADViewerContent = React.lazy(() => import('./CADViewerContent'))

const CELL = {
  width: '100%', height: '100%', display: 'flex',
  alignItems: 'center', justifyContent: 'center', background: '#020617',
}
const LABEL = {
  fontFamily: 'monospace', fontSize: 11,
  color: '#475569', letterSpacing: '0.15em', textTransform: 'uppercase',
}

class ErrorBoundary extends React.Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed)
      return <div style={CELL}><span style={LABEL}>Failed to load model</span></div>
    return this.props.children
  }
}

function Fallback() {
  return <div style={CELL}><span style={LABEL}>Loading viewer…</span></div>
}

export default function CADViewer({ url, accentHex = '#3B82F6', height = '360px' }) {
  return (
    <div style={{
      width: '100%', height,
      borderRadius: '0.75rem', overflow: 'hidden',
      border: '1px solid #334155',
    }}>
      <ErrorBoundary>
        <Suspense fallback={<Fallback />}>
          <CADViewerContent url={url} accentHex={accentHex} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

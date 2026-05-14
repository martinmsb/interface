import { Trans } from '@lingui/macro';
import { Box, Chip, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRootStore } from 'src/store/root';

function isTorBrowser(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth === 1000 && window.innerHeight === 1000;
}

export const TorStatusIndicator = () => {
  const preference = useRootStore((s) => s.privacyPreference);
  const setPrivacyPreference = useRootStore((s) => s.setPrivacyPreference);
  const [torBrowser, setTorBrowser] = useState(false);

  useEffect(() => {
    setTorBrowser(isTorBrowser());
  }, []);

  const toggle = () => setPrivacyPreference(preference === 'tor' ? 'clearnet' : 'tor');

  const dotColor = preference === 'clearnet' ? '#8E92A3' : '#46BC4B';

  const label = preference === 'clearnet' ? 'Clearnet' : torBrowser ? 'Tor Browser' : 'Tor';

  const tooltipText =
    preference === 'clearnet'
      ? 'Queries use clearnet. Click to enable Tor routing.'
      : torBrowser
      ? 'Queries go directly to .onion via Tor Browser. Click to switch to clearnet.'
      : 'Queries routed through Tor via server-side proxy. Click to switch to clearnet.';

  return (
    <Tooltip title={<Trans>{tooltipText}</Trans>} placement="bottom" arrow>
      <Chip
        onClick={toggle}
        size="small"
        icon={
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: dotColor,
              ml: '6px !important',
              flexShrink: 0,
            }}
          />
        }
        label={label}
        sx={{
          cursor: 'pointer',
          backgroundColor: 'transparent',
          border: '1px solid',
          borderColor: 'divider',
          color: '#8E92A3',
          fontSize: '0.7rem',
          height: 22,
          '&:hover': { borderColor: 'text.secondary' },
        }}
      />
    </Tooltip>
  );
};

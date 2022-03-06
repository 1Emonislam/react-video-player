import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Slider from "@material-ui/core/Slider";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import FastForwardIcon from "@material-ui/icons/FastForward";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import FullScreen from "@material-ui/icons/Fullscreen";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeMute from "@material-ui/icons/VolumeOff";
import VolumeUp from "@material-ui/icons/VolumeUp";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import './Controls.css';
const useStyles = makeStyles((theme) => ({
  controlsWrapper: {
    visibility: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  button: {
    margin: theme.spacing(1),
  },
  controlIcons: {
    color: "#777",

    fontSize: 30,
    transform: "scale(0.9)",
    "&:hover": {
      color: "#fff",
      transform: "scale(1)",
    },
  },

  bottomIcons: {
    color: "#999",
    "&:hover": {
      color: "#fff",
    },
  },

  volumeSlider: {
    width: 100,
  },
}));

const PrettoSlider = withStyles({
  root: {
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const Controls = forwardRef(
  (
    {
      onSeek,
      onSeekMouseDown,
      onSeekMouseUp,
      onRewind,
      onPlayPause,
      onFastForward,
      playing,
      played,
      elapsedTime,
      totalDuration,
      onMute,
      muted,
      onVolumeSeekDown,
      onChangeDispayFormat,
      playbackRate,
      onPlaybackRateChange,
      onToggleFullScreen,
      volume,
      onVolumeChange,
      onBookmark,
    },
    ref
  ) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const noderef = React.useRef(null)
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    let [state, setState] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    return (
      <div ref={ref} className={classes.controlsWrapper}>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          style={{ flexGrow: 1 }}
        >
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            style={{ padding: '5px 10px' }}
          >
            <Grid item>
              <Typography variant="h5" className="video-title" style={{ color: "#fff" }}>
                Video Title
              </Typography>
            </Grid>
            <Grid item title="BookMark" style={{ cursor: 'pointer', color: 'white' }} onClick={onBookmark}>
              <BookmarkIcon />
            </Grid>
          </Grid>
          <Grid container direction="row" alignItems="center" justifyContent="center">
            <IconButton
              onClick={onRewind}
              className={classes.controlIcons}
              aria-label="rewind"
            >
              <FastRewindIcon
                className={classes.controlIcons}
                fontSize="inherit"
              />
            </IconButton>
            <IconButton
              onClick={onPlayPause}
              className={classes.controlIcons}
              aria-label="play"
            >
              {playing ? (
                <PauseIcon fontSize="inherit" />
              ) : (
                <PlayArrowIcon fontSize="inherit" />
              )}
            </IconButton>
            <IconButton
              onClick={onFastForward}
              className={classes.controlIcons}
              aria-label="forward"
            >
              <FastForwardIcon fontSize="inherit" />
            </IconButton>
          </Grid>
          {/* bottom controls */}
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={{ padding: "0 20px" }}
          >
            <Grid item xs={12}>
              <PrettoSlider
                min={0}
                max={100}
                ValueLabelComponent={(props) => (
                  <ValueLabelComponent {...props} value={elapsedTime} />
                )}
                aria-label="custom thumb label"
                value={played * 100}
                onChange={onSeek}
                onMouseDown={onSeekMouseDown}
                onChangeCommitted={onSeekMouseUp}
                noderef={noderef}
              />
            </Grid>

            <Grid container spacing={0} justifyContent="space-between" alignItems="center">
              <Grid item xs={1}>
                <IconButton
                  onClick={onPlayPause}
                  className={classes.bottomIcons}
                >
                  {playing ? (
                    <PauseIcon fontSize="small" />
                  ) : (
                    <PlayArrowIcon fontSize="small" />
                  )}
                </IconButton>
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  onBlur={() => {
                    setState({ ...state, muted: !state.muted })
                  }}
                  onClick={onMute}
                  className={`${classes.bottomIcons} ${classes.volumeButton}`}
                >
                  {muted ? (
                    <VolumeMute fontSize="small" />
                  ) : volume > 0.5 ? (
                    <VolumeUp fontSize="small" />
                  ) : (
                    <VolumeDown fontSize="small" />
                  )}
                </IconButton>
              </Grid>
              <Grid item xs={2}>
                <Slider
                  min={0}
                  max={100}
                  value={muted ? 0 : volume * 100}
                  onChange={onVolumeChange}
                  aria-labelledby="input-slider"
                  className={classes.volumeSlider}
                  onMouseDown={onSeekMouseDown}
                  onChangeCommitted={onVolumeSeekDown}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="text"
                  onClick={
                    onChangeDispayFormat
                    //     () =>
                    //   setTimeDisplayFormat(
                    //     timeDisplayFormat == "normal" ? "remaining" : "normal"
                    //   )
                  }
                >
                  <Typography
                    variant="body1"
                    style={{ color: "#fff", marginLeft: '43px', marginRight: '6px' }}
                  >
                    {elapsedTime}/{totalDuration}
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Popover
                  container={ref.current}
                  open={open}
                  id={id}
                  onClose={handleClose}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <>
                    {[0.5, 1, 1.5, 2].map((rate) => (
                      <Button
                        key={rate}
                        onChange={() => setState({ ...state, playbackRate: rate })}
                        onClick={() => onPlaybackRateChange(rate)}
                        variant="text"
                      >
                        <Typography
                          color={rate === playbackRate ? "secondary" : "inherit"}
                        >
                          {rate}X
                        </Typography>
                      </Button>
                    ))}
                  </>
                </Popover>
              </Grid>
         
              <Grid item xs={1}>
                <Button
                  onClick={handleClick}
                  aria-describedby={id}
                  className={classes.bottomIcons}
                  variant="text"
                >
                  <Typography style={{marginLeft:'16px'}}> {playbackRate}X</Typography>
                </Button>
              </Grid>
              <Grid item xs={1}>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  onClick={onToggleFullScreen}
                  className={classes.bottomIcons}
                ><FullScreen fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
);

Controls.propTypes = {
  onSeek: PropTypes.func,
  onSeekMouseDown: PropTypes.func,
  onSeekMouseUp: PropTypes.func,
  onDuration: PropTypes.func,
  onRewind: PropTypes.func,
  onPlayPause: PropTypes.func,
  onFastForward: PropTypes.func,
  onVolumeSeekDown: PropTypes.func,
  onChangeDispayFormat: PropTypes.func,
  onPlaybackRateChange: PropTypes.func,
  onToggleFullScreen: PropTypes.func,
  onMute: PropTypes.func,
  playing: PropTypes.bool,
  played: PropTypes.number,
  elapsedTime: PropTypes.string,
  totalDuration: PropTypes.string,
  muted: PropTypes.bool,
  playbackRate: PropTypes.number,
};
export default Controls;

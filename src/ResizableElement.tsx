import { Component } from 'react';


interface ResizableElementProps {
  initialWidth: number;
  initialHeight: number;
}

interface ResizableElementState {
  width: number;
  height: number;
}


class ResizableElement extends Component<ResizableElementProps, ResizableElementState> {
  constructor(props: ResizableElementProps) {
    super(props);
    this.state = {
      width: props.initialWidth,
      height: props.initialHeight,
    };
  }

  render() {
    const { width, height } = this.state;

    return (
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          resize: 'both',
          overflow: 'auto',
          border: '1px solid #000',
        }}
      >
        {/* Your content here */}
      </div>
    );
  }
}

export default ResizableElement;

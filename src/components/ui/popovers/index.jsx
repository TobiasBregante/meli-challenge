import {useFloating} from '@floating-ui/react-dom';
import { Fragment } from 'react';

const PopOver = ({ isOpen,placement, content, children }) => {
    const {x, y, reference, floating, strategy} = useFloating({placement:placement ?? "bottom-end"});


    return (
        <Fragment>
            <div ref={reference}>{children}</div>

            {isOpen &&
                <div
                ref={floating}
                style={{
                  position: strategy,
                  top: y ?? '',
                  left: x ?? '',
                }}
                className="z-index-infinite"
              >
                {content}
              </div>
            }
        </Fragment>
    );
};

export default PopOver
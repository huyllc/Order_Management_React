import { LoadingOverlayStyles } from 'constants/styles.general.const';

const Loading = () => {
    return (
        <LoadingOverlayStyles className="position-absolute w-100 h-100 bg-secondary-subtle">
            <div className="d-flex gap-3 mb-2">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-border text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            <p className='loading-text'>Please wait...</p>
        </LoadingOverlayStyles>
    );
};

export default Loading;
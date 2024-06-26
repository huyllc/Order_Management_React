import React from "react";

interface AlertContextType {
    showAlert: boolean;
    setShowAlert: (show: boolean) => void;
    alertMessage: string;
    setAlertMessage: (msg: string) => void;
}

const AlertContext = React.createContext<AlertContextType | undefined>(undefined);

function AlertProvider (props: any) {
    const [showAlert, setShowAlert] = React.useState<boolean>(false);
    const [alertMessage, setAlertMessage] = React.useState('Well done!');

    React.useEffect(() => {
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    }, [showAlert]);

    const value = {showAlert, setShowAlert, alertMessage, setAlertMessage};

    return <AlertContext.Provider {...props} value={value}></AlertContext.Provider>
}

function useAlert() {
    const context = React.useContext(AlertContext);
    if(typeof context === "undefined") throw new Error('useAlert must be used within AlertProvider');
    return context; 
}

export { AlertProvider, useAlert };
export function logger(message: string): void {
    const logger = document.getElementById('logger');
    
    if (logger) {
        logger.innerText += message + '\n';
    }
}

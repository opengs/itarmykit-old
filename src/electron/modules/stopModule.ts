import { ChildProcessWithoutNullStreams, spawn } from 'node:child_process'
import os from 'node:os'
export const stopModuleProcess = (moduleProcess: ChildProcessWithoutNullStreams) => {
    if (moduleProcess) {
        const killCommand =
            os.platform() === 'win32'
                ? `taskkill /F /T /PID ${moduleProcess.pid}`
                : `kill -TERM ${moduleProcess.pid}`

        spawn(killCommand, { shell: true })
    }
}

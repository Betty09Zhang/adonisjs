import mqtt from 'mqtt'
const client = mqtt.connect('mqtt://192.168.10.212:8000')
export const publishMsg = (topic, msg) => {
    client.publish(topic, msg, {
        qos: 1,
        retain: true
    })
}


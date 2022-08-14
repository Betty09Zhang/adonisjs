import * as dtmcli from "dtmcli";
const Tcc = dtmcli.Tcc
const checkStatus = dtmcli.checkStatus
const genGid = dtmcli.genGid
export const tccGlobalTransactionByPerson = async function (dtmUrl, cb, gid) : Promise<string>{
    let tcc = gid ? new Tcc(dtmUrl,gid) : new Tcc(dtmUrl, await genGid(dtmUrl))
    let tbody = {
      gid: genGid || tcc.gid,
      trans_type: "tcc",
    }
    try {
      let { status } = await tcc.dtmClient.post("/prepare", tbody)
      checkStatus(status)
      await cb(tcc)
      await tcc.dtmClient.post("/submit", tbody)
    } catch (e) {
      console.error(e)
      await tcc.dtmClient.post("/abort", tbody)
      return ""
    }
    return tcc.gid
}
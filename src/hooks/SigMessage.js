import { questionAddStatus } from "@/atoms/problemAtom";
import { toast } from "sonner";

//   const [error, setError] = useState(null);

export const signMessageWithTimeConstraint = async () => {
  try {
    if (window.tronLink === undefined) {
      throw new Error("TronLink not found");
    }
    if (!window.tronLink.ready) {
      await window.tronLink.request({ method: "tron_requestAccounts" });
      return;
    }

    const sigValidTill = BigInt(Date.now() + 30000).toString();
    const message =
      window.tronLink.tronWeb.defaultAddress?.base58 + ":" + sigValidTill;
    const signature = await window.tronLink.tronWeb.trx.signMessageV2(message);

    return { message, signature };
  } catch (err) {
    toast.error(err.message);
    console.error(err);
    throw new Error(err);
    //   setError(err.message);
  }
};

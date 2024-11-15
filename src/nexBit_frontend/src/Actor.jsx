import React from "react";
import {
  ActorProvider,
  createActorContext,
  createUseActorHook,
} from "ic-use-actor";
import { canisterId, idlFactory } from "../../declarations/basic_bitcoin/index";
import { useInternetIdentity } from "ic-use-internet-identity";

const actorContext = createActorContext();
export const useActor = createUseActorHook(actorContext);

export default function Actors({ children }) {
  const { identity } = useInternetIdentity();

  return (
    <ActorProvider
      canisterId={canisterId}
      context={actorContext}
      identity={identity}
      idlFactory={idlFactory}
    >
      {children}
    </ActorProvider>
  );
}

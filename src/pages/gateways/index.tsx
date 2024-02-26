interface Gateway {
  size: "small" | "medium" | "large";
  color: string;
  waves: Wave[];
  rewards: Reward[];
  failures: Failure[];
  spawn_algorithm: SpawnAlgorithm;
  rules: GateRules;
}

type GateRules = {
  spawn_range: number;
  leash_range: number;
  allow_discarding: boolean;
  allow_dim_change: boolean;
  player_damage_only: boolean;
  remove_mobs_on_failurs: boolean;
  fail_on_out_of_bounds: boolean;
  spacing: number;
};

const defaultGateRules: GateRules = {
  spawn_range: 8,
  leash_range: 32,
  allow_discarding: false,
  allow_dim_change: false,
  player_damage_only: false,
  remove_mobs_on_failurs: true,
  fail_on_out_of_bounds: false,
  spacing: 0,
};

type SpawnAlgorithm = "gateways:open_field";

interface Wave {
  entities: WaveEntity[];
  modifiers: WaveModifier[];
  rewards: Reward[];
  max_wave_time: number;
  setup_time: number;
}

type WaveEntity = {
  type: "gateways:standard";
  entity: string;
  desc: string;
  nbt: string;
  modifiers: WaveModifier[];
  count: number;
};

type WaveModifier =
  | {
      type: "gateways:mob_effect";
    }
  | { type: "gateways:attribute" }
  | { type: "gateways:gear_set" };

type Reward =
  | {
      type: "gateways:stack";
      stack: ItemStack;
    }
  | {
      type: "gateways:stack_list";
      stacks: ItemStack[];
    }
  | {
      type: "gateways:entity_loot";
      entity: string;
      nbt: string;
      rolls: number;
    };

type ItemStack = {
  item: string;
  optional: boolean;
  count: number;
  nbt: string;
  cap_nbt: string;
};

type Failure =
  | { type: "gateways:explosion" }
  | { type: "gateways:mob_effect" }
  | { type: "gateways:command" }
  | { type: "gateways:chanced" }
  | { type: "gateways:summon" };

export default function Gateways() {
  return <>Gateway Generator</>;
}

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import Select from "../Select";
import { MOCK_LOCATIONS } from "./data";

const Fixture = (props: Parameters<typeof Select>[0]) => {
  const [value, setValue] = useState(props.value);
  return (
    <Select
      {...props}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        props.onChange(e);
      }}
    />
  );
};

test("Select matches base snapshot", () => {
  const { asFragment } = render(
    <Fixture
      onChange={vi.fn()}
      value={JSON.stringify(MOCK_LOCATIONS[0])}
      label="Search"
      options={MOCK_LOCATIONS}
    />
  );

  expect(asFragment()).toMatchSnapshot();
});

test("Select accepts a default value that isn't the first option", () => {
  const defaultValue = JSON.stringify(MOCK_LOCATIONS[1]);
  const { getByRole } = render(
    <Fixture
      onChange={vi.fn()}
      value={defaultValue}
      label="Search"
      options={MOCK_LOCATIONS}
    />
  );
  const option = getByRole("option", {
    name: MOCK_LOCATIONS[1].name,
  }) as HTMLOptionElement;
  expect(option.selected).toBe(true);
});

test("Select value responds to users choice", async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  const defaultValue = JSON.stringify(MOCK_LOCATIONS[0]);
  const expectedValue = JSON.stringify(MOCK_LOCATIONS[1]);
  const { getByRole } = render(
    <Fixture
      onChange={onChange}
      value={defaultValue}
      label="Search"
      options={MOCK_LOCATIONS}
    />
  );

  const input = getByRole("combobox");
  const option = getByRole("option", {
    name: MOCK_LOCATIONS[1].name,
  }) as HTMLOptionElement;
  await user.selectOptions(input, expectedValue);

  expect(option.selected).toBe(true);
  expect(onChange).toHaveBeenCalledOnce();
});

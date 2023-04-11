import React from "react";
import { Input, IconButton } from "@mui/joy";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function Searchbar() {
  return (
    <div className="mb-12">
      <div>
        <form>
          <center>
            <Input
              type="search"
              placeholder="Search location..."
              endDecorator={
                <IconButton
                  sx={{
                    borderRadius: 888,
                  }}
                >
                  <SearchRoundedIcon />
                </IconButton>
              }
              sx={{
                maxWidth: 800,
                border: "none",
                borderRadius: 58,
                paddingX: 2.5,
              }}
            />
          </center>
        </form>
      </div>
    </div>
  );
}

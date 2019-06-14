import { Card, Divider, Tab, Tabs, Typography } from "@material-ui/core"
import * as React from "react"
import { Replay } from "../../Models"
import { ReplaysGroupChartsWrapper } from "./Charts/ReplaysGroupChartsWrapper"
import { ReplaysGroupTable } from "./Table/ReplaysGroupTable"

interface Props {
    replays: Replay[]
}

type ReplaysDetailsTab = "Table" | "Charts"

interface State {
    selectedTab: ReplaysDetailsTab
}

export class ReplaysGroupContent extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {selectedTab: "Charts"}
    }

    public render() {
        return (
            <>
                {this.props.replays.length > 0 ?
                    (!this.props.replays.every((val, _i, arr) => { return val.gameMode === arr[0].gameMode; }) ?
                        <>
                            <Card square style={{width: "100%", backgroundColor: "#ebd324"}}>
                                <Typography variant="subheading" align="center">
                                    WARNING: selected replays are from different modes, stats might be inaccurate!
                                </Typography>
                            </Card>
                            <Divider/>
                            <Divider/>
                            <Divider/>
                        </>
                        : <></>
                    )
                    : <></>
                }
                <Card square style={{width: "100%"}}>
                    <Tabs value={this.state.selectedTab}
                        onChange={this.handleSelectTab}
                        centered
                    >
                        <Tab label="Table" value="Table"/>
                        <Tab label="Charts" value="Charts"/>
                    </Tabs>
                    <Divider/>
                    {this.state.selectedTab === "Table" ?
                        <ReplaysGroupTable replays={this.props.replays}/>
                        :
                        <ReplaysGroupChartsWrapper replays={this.props.replays}/>
                    }
                </Card>
            </>
        )
    }

    private readonly handleSelectTab = (_: React.ChangeEvent<{}>, selectedTab: ReplaysDetailsTab) => {
        this.setState({selectedTab})
    }
}

import React from 'react';
import { mount } from 'enzyme';
import ShardOverview from './shard-overview';
import styles from './shard-overview.less';

describe('<ShardOverview />', () => {
  const shards = {
    shard01: {
      hosts:"shard01/localhost:27018,localhost:27019,localhost:27020",
      size:0.0004,
      databaseSizes:[0.00042539555579423904],
      hasPrimary: true
    }, shard02: {
      hosts: "shard02/localhost:27021,localhost:27022,localhost:27023",
      size: 0.0004,
      databaseSizes: [0.00043928157538175583],
      hasPrimary: true
    }
  };

  describe('#render', () => {
    describe('2 shards', () => {
      let component;
      before((done) => {
        component = mount(<ShardOverview shards={shards}
                                         balancerEnabled={true}
                                         balancerRunning={false}
                                         balancerLockedWhen={new Date()}
                                         balancerLockedBy={"ConfigServer:Balancer"}
                                         balancerLockedWhy={"CSRS Balancer"}
                                         balancerErrors={[]}
                                         numberOfShards={2}
                                         totalSize={0.0009} />);
        done();
      });
      it('renders the shard overview classname', () => {
        expect(component.find(`.${styles.top}`)).to.be.present();
      });
      it('renders the shard badge with the right number of shards', () => {
        expect(component.find(`.${styles['shards-badge']}`).text()).to.equal('2 Shards');
      });
    });
  });

  describe('#actions', () => {
    const actions = { refresh: sinon.spy() };
    before((done) => {
      const component = mount(<ShardOverview shards={shards}
                                             balancerEnabled={true}
                                             balancerRunning={false}
                                             balancerLockedWhen={new Date()}
                                             balancerLockedBy={"ConfigServer:Balancer"}
                                             balancerLockedWhy={"CSRS Balancer"}
                                             balancerErrors={[]}
                                             numberOfShards={2}
                                             totalSize={0.0009}
                                             actions={actions} />);
      component.find('button').simulate('click');
      done();
    });
    it('triggers the refresh action', () => {
      expect(actions.refresh.callCount).to.equal(1);
    });
  });
});
